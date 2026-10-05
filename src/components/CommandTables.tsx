"use client";

import { CopyValue } from "@/components/CopyValue";
import type { CommandGroup } from "@/data/commands";
import { SERVER_ADDRESS } from "@/data/site";

export function CommandTables({ groups }: { groups: CommandGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.title} aria-labelledby={`grp-${group.title}`}>
          <div className="border-b border-hairline pb-4">
            <h2
              id={`grp-${group.title}`}
              className="text-xl font-extrabold text-ink"
            >
              {group.title}
            </h2>
            <p className="mt-2 text-sm text-ink-muted">{group.description}</p>
          </div>

          <div className="mt-5 overflow-x-auto rounded-card border border-hairline">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline bg-surface/60">
                  <th
                    scope="col"
                    className="label-mono w-[22rem] px-4 py-3.5 text-ink-muted"
                  >
                    Command
                  </th>
                  <th scope="col" className="label-mono px-4 py-3.5 text-ink-muted">
                    Who
                  </th>
                  <th scope="col" className="label-mono px-4 py-3.5 text-ink-muted">
                    Effect
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr
                    key={row.command}
                    className="border-b border-hairline/60 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                  >
                    <th scope="row" className="px-4 py-3.5 align-top">
                      <span className="flex items-center gap-2">
                        <code className="select-all break-all font-mono text-sm font-bold text-brand-hi">
                          {row.command}
                        </code>
                        <CopyValue
                          value={row.command}
                          label="Copy"
                          copiedLabel="Copied"
                          variant="ghost"
                          size="sm"
                          className="shrink-0"
                        />
                      </span>
                    </th>
                    <td className="px-4 py-3.5 align-top">
                      <span className="label-mono rounded-pill border border-hairline px-2.5 py-1 text-ink-muted">
                        {row.who}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-top text-sm leading-relaxed text-ink-muted">
                      {row.effect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <aside className="glass rounded-card p-6">
        <h2 className="label-mono text-brand">Still can&apos;t find the server?</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Copy the address below and paste it straight into your multiplayer
          list. This is the only address you need.
        </p>
        <div className="mt-4">
          <CopyValue value={SERVER_ADDRESS} asBlock label="Copy IP" />
        </div>
      </aside>
    </div>
  );
}
