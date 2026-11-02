/**
 * Local verification for the SLP client: starts a fake status server that
 * speaks the real protocol, then asserts the parser reads the version out.
 * Run with: npx tsx scripts/ping-fixture-test.ts
 */
import net from "node:net";

import { pingServer } from "../src/lib/mc-ping";

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

const MOTD =
  "<b><gradient:#4cadd0:#b2f9ff>TheySix Events</gradient></b> \u00a78| <color:#FFFFFF>\u0493\u0293\u01B9\u026A\u0265\u1D62\u02E2\u029F\u029F\u1D21\u02E2\u029F\u1D21</color>";

const statusPayload = Buffer.from(
  JSON.stringify({
    version: { name: "1.21.11", protocol: 774 },
    players: { online: 37, max: 999, sample: [] },
    description: { text: MOTD },
    enforcesSecureChat: true,
  }),
  "utf8",
);

const response = Buffer.concat([
  encodeVarInt(
    encodeVarInt(0x00).length + encodeVarInt(statusPayload.length).length + statusPayload.length,
  ),
  encodeVarInt(0x00),
  encodeVarInt(statusPayload.length),
  statusPayload,
]);

async function main(): Promise<void> {
  let framesSeen = 0;

  const server = net.createServer((socket) => {
    // A real server replies once to the handshake+status pair, which TCP may
    // deliver as a single coalesced chunk, so respond on the first read.
    socket.on("data", () => {
      framesSeen += 1;
      socket.write(response);
    });
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as net.AddressInfo;

  const result = await pingServer(4000, { host: "127.0.0.1", port });
  console.log("ping result:", JSON.stringify(result));
  console.log("data events at fixture:", framesSeen);

  await new Promise<void>((resolve) => server.close(() => resolve()));

  const ok = result.online === true && result.version === "1.21.11";
  console.log(ok ? "PASS" : "FAIL");
  process.exit(ok ? 0 : 1);
}

void main();
