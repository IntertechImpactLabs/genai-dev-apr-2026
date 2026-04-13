# D7: Connect an MCP Server

**Course section:** 5. MCP, Skills & Orchestration | **Duration:** 10 min

## Purpose

Show that MCP is a standard protocol: build one server, connect it to multiple agents. The agent discovers and uses tools it wasn't built with.

## The example

A project documentation server that lets agents search and read your team's docs (architecture, deployment, onboarding). Immediately relatable — every developer has documentation they wish their tools could access.

## Files

- `server.js` — The MCP server (~40 lines of logic)
- `package.json` — Dependencies (just the MCP SDK)
- `docs/` — Sample project documentation (architecture, deployment, onboarding)
- `demo-script.md` — Step-by-step instructor script with talking points

## Quick start

```bash
npm install
```

### Connect to Copilot or Claude

```json
// .vscode/mcp.json - GitHub Copilot
{
    "servers": {
        "project-docs": {
            "type": "stdio",
            "command": "node",
            "args": [
                "server.js"
            ],
            "env": {
                "DOCS_DIR": "docs"
            }
        }
    }
}
```

```json
// .mcp.json - Claude Code
{
  "mcpServers": {
    "project-docs": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "DOCS_DIR": "docs"
      }
    }
  }
}
```

## Key teaching moments

| Step | What it shows |
|------|--------------|
| Code walkthrough | MCP servers are small — tool schema + handler, SDK does the rest |
| Copilot config | 3 lines of JSON to connect |
| Agent uses the tool | The agent searches and reads docs it didn't know about |
| Claude Code config | Same server, different agent — that's the protocol |
