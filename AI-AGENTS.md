# Working on the events website

Edit the relevant table in `src/data` before editing page copy that consumes it. Check commands, arena names and ranks against the server configuration when changing a player-facing fact.

Run `npm run verify:data` for roster updates and `npm run verify:ping` for changes to the status path. Keep the fixture independent of the live Minecraft server. For broader changes, `npm run verify` covers types, both verification scripts and lint. Use `npm run build` for a production compilation.

For UI work, check a narrow viewport, copyable server information and the status display with an unavailable response. See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).
