/**
 * Minecraft Server List Ping (SLP) client.
 *
 * Handshake + status request over plain TCP, with VarInt-prefixed fields.
 * Raw sockets live here (Node runtime only) so the browser bundle never sees them.
 */

const PROTOCOL_VERSION = -1; // Any version: the status response does not gate on it.

const HANDSHAKE_HOST = "theysix.sparked.network";
const HANDSHAKE_PORT = 25625;

export type PingResult = {
  /** null means the ping failed, which is not the same as zero players. */
  online: boolean;
  playersOnline: number | null;
  playersMax: number | null;
  version: string | null;
  /** Round-trip time in milliseconds, measured across the full request. */
  latency: number;
  /**
   * Why the ping failed, when it did. "refused" means the host answered with
   * an RST, so the server is genuinely not listening. DNS or timeout failures
   * are "unreachable" and say nothing about the server's own state.
   */
  errorKind: "refused" | "unreachable" | null;
};

function encodeVarInt(value: number): Buffer {
  const bytes: number[] = [];
  let remaining = value >>> 0;
  do {
    let byte = remaining & 0x7f;
    remaining >>>= 7;
    if (remaining !== 0) byte |= 0x80;
    bytes.push(byte);
  } while (remaining !== 0);
  return Buffer.from(bytes);
}

/** Length-prefixes a packet payload with its VarInt byte length. */
function frame(payload: Buffer): Buffer {
  return Buffer.concat([encodeVarInt(payload.length), payload]);
}

/**
 * Cursor over a single packet payload. Advances in place so nested reads share
 * one offset instead of allocating a reader per string.
 */
class PayloadReader {
  private offset = 0;

  constructor(private readonly buffer: Buffer) {}

  /** Bytes consumed so far. */
  get consumed(): number {
    return this.offset;
  }

  private require(count: number): void {
    if (this.offset + count > this.buffer.length) {
      throw new Error("truncated packet");
    }
  }

  readVarInt(): number {
    let value = 0;
    let shift = 0;
    for (let i = 0; i < 5; i += 1) {
      this.require(1);
      const byte = this.buffer[this.offset];
      this.offset += 1;
      value |= (byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) return value;
      shift += 7;
    }
    throw new Error("varint too long");
  }

  readString(maxBytes = 32767): string {
    const length = this.readVarInt();
    if (length > maxBytes) throw new Error("string exceeds max length");
    this.require(length);
    const slice = this.buffer.subarray(this.offset, this.offset + length);
    this.offset += length;
    return slice.toString("utf8");
  }
}

function buildHandshake(): Buffer {
  const hostBytes = Buffer.from(HANDSHAKE_HOST, "utf8");
  const fields = Buffer.concat([
    encodeVarInt(PROTOCOL_VERSION),
    encodeVarInt(hostBytes.length),
    hostBytes,
    Buffer.from([(HANDSHAKE_PORT >> 8) & 0xff, HANDSHAKE_PORT & 0xff]),
    encodeVarInt(1), // next state: 1 = status
  ]);
  return frame(Buffer.concat([encodeVarInt(0x00), fields]));
}

function buildStatusRequest(): Buffer {
  return frame(Buffer.from([0x00]));
}

/**
 * Returns the byte offset where the frame payload starts, or null while the
 * frame is still incomplete.
 */
function payloadOffset(buffer: Buffer): { offset: number; length: number } | null {
  const reader = new PayloadReader(buffer);
  let length: number;
  try {
    length = reader.readVarInt();
  } catch {
    return null;
  }
  const offset = reader.consumed;
  if (buffer.length < offset + length) return null;
  return { offset, length };
}

function parseStatusResponse(payload: Buffer): Omit<PingResult, "latency"> {
  const reader = new PayloadReader(payload);
  const packetId = reader.readVarInt();
  if (packetId !== 0x00) throw new Error("unexpected packet id");
  const json = reader.readString(262144);
  const parsed = JSON.parse(json) as {
    version?: { name?: unknown };
    players?: { online?: unknown; max?: unknown };
  };

  const version =
    typeof parsed?.version?.name === "string" ? parsed.version.name : null;
  const playersOnline =
    typeof parsed?.players?.online === "number" ? parsed.players.online : null;
  const playersMax =
    typeof parsed?.players?.max === "number" ? parsed.players.max : null;

  return {
    online: true,
    playersOnline,
    playersMax,
    version,
    errorKind: null,
  };
}

export function pingServer(
  timeoutMs = 4000,
  target: { host: string; port: number } = {
    host: HANDSHAKE_HOST,
    port: HANDSHAKE_PORT,
  },
): Promise<PingResult> {
  const startedAt = Date.now();

  return new Promise<PingResult>((resolve) => {
    let settled = false;
    let received: Buffer = Buffer.alloc(0);
    let socket: import("net").Socket | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = (): void => {
      if (timer) clearTimeout(timer);
      if (socket) {
        socket.removeAllListeners();
        socket.destroy();
      }
    };

    const finish = (result: PingResult): void => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const fail = (kind: "refused" | "unreachable"): void =>
      finish({
        online: false,
        playersOnline: null,
        playersMax: null,
        version: null,
        latency: Date.now() - startedAt,
        errorKind: kind,
      });

    const net = require("net") as typeof import("net");

    /** ECONNREFUSED/RESET mean the host answered: the server is not listening. */
    const classify = (error: NodeJS.ErrnoException): "refused" | "unreachable" =>
      error.code === "ECONNREFUSED" || error.code === "ECONNRESET"
        ? "refused"
        : "unreachable";

    try {
      socket = net.createConnection({ host: target.host, port: target.port });
    } catch {
      fail("unreachable");
      return;
    }

    timer = setTimeout(() => fail("unreachable"), timeoutMs);
    socket.setTimeout(timeoutMs, () => fail("unreachable"));
    socket.on("error", (error: NodeJS.ErrnoException) => fail(classify(error)));
    socket.on("close", () => fail("unreachable"));

    socket.on("connect", () => {
      socket?.write(buildHandshake());
      socket?.write(buildStatusRequest());
    });

    socket.on("data", (chunk) => {
      if (settled) return;
      received = Buffer.concat([received, chunk]);
      const frame2 = payloadOffset(received);
      if (!frame2) return;
      try {
        const parsed = parseStatusResponse(
          received.subarray(frame2.offset, frame2.offset + frame2.length),
        );
        finish({ ...parsed, latency: Date.now() - startedAt });
      } catch {
        fail("unreachable");
      }
    });
  });
}
