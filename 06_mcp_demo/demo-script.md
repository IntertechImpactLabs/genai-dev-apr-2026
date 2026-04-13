# D7: Connect an MCP Server

**Section:** 5. MCP, Skills & Orchestration | **Duration:** 10 min | **Type:** Live coding + agent interaction

## Point it proves

MCP is a standard protocol that lets any agent use any tool. Build one server, connect it to multiple agents. The agent discovers and uses tools it wasn't built with.

## Prerequisites

- Node.js 18+
- `npm install` in this directory
- Claude Code installed OR VS Code with Copilot
- The `docs/` folder has sample project documentation (architecture, deployment, onboarding)

## Setup

```bash
cd exercises/07_mcp_demo
npm install
```

## Setup slide talking points

> "MCP is the USB-C of AI tools. One standard connector that works with any agent. Let's build a simple MCP server — about 40 lines of real logic — and plug it into two different agents."

## Demo steps

### Step 1: Walk through the server code (2 min)

**Open** `server.js` in the editor.

**What to point out (top to bottom):**

1. **Imports** (lines 1-6): "We import from the MCP SDK. Server, transport, and the request schemas."
2. **Tool definitions** (the `ListToolsRequestSchema` handler): "This tells any agent what tools we offer. Two tools: `search_docs` to find documentation by keyword, and `get_doc` to read a specific file. Notice the JSON schema for parameters — this is how the agent knows what arguments to pass."
3. **Tool execution** (the `CallToolRequestSchema` handler): "When the agent calls a tool, this code runs. `search_docs` finds matching files and returns previews. `get_doc` reads the full file."
4. **Startup** (last 5 lines): "Create a transport, connect. That's it."

**What to say:**
> "This is the whole server. ~40 lines of logic. It finds markdown files and lets agents search and read them. The MCP SDK handles all the protocol details — we just define tools and implement them."

### Step 2: Configure in Copilot (2 min)

**What to do:** Show the VS Code MCP config:

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

**What to say:**
> "Three lines of config: the command to run, the args, and where to find the docs. Copilot will start this server automatically and discover the tools."

**What to point out:** Open Copilot chat and show that the tools appear. "Copilot now knows about `search_docs` and `get_doc`. We didn't install a plugin or extension — we just pointed it at a server."

### Step 3: Ask the agent to use it (3 min)

**What to do:** In Copilot chat (or Claude Code), ask:

```
What's our deployment process? How do I roll back a bad deploy?
```

**What to point out:**
- The agent calls `search_docs` with "deployment" or "rollback"
- It gets back the matching doc
- It calls `get_doc` to read the full deployment guide
- It answers with specific information from your docs: environments, the deploy pipeline, the rollback commands

**What to say:**
> "The agent didn't know our deployment process 30 seconds ago. We built a server, connected it, and now it can search and read our docs. This is the same pattern you'd use to connect to a database, an API, a CI/CD system — anything you want your agent to access."

### Step 4: Show it in Claude Code (2 min)

**What to do:**

```bash
claude mcp add project-docs -- node exercises/07_mcp_demo/server.js
```

Then ask the same question in Claude Code.

**What to say:**
> "Same server, different agent. One line to connect. The tools show up, the agent uses them, same result. That's the point of a protocol — build once, use everywhere."

### Step 5: Debrief (1 min)

**What to say:**
> "MCP gives agents access to the outside world through a standard interface. You write tools once as MCP servers, and any MCP-compatible agent can discover and use them. In 2026, MCP is supported by Copilot, Claude Code, Cursor, Windsurf, and dozens of other tools. The ecosystem has over 97 million monthly SDK downloads. It's not a vendor feature — it's an industry protocol."

## Fallback plan

If npm install fails or the server won't start:
1. Show the code walkthrough (Step 1) — the teaching point lands from reading the code
2. Use screenshots of the agent discovering and calling the tools
3. The config examples work as visuals even without running

## Connection to D8 (Skills)

After this demo, transition with:
> "MCP connects agents to external tools. But what about teaching agents how to do things your way — your team's conventions, your review process, your test patterns? That's what Skills are for."
