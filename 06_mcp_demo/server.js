#!/usr/bin/env node
/**
 * D7: Project Documentation MCP Server
 *
 * A minimal MCP server that gives agents access to project documentation.
 * This is the demo code — ~40 lines of actual logic, meant to be
 * walked through line by line on screen.
 *
 * What it does:
 *   - Exposes a "search_docs" tool that finds relevant docs by keyword
 *   - Exposes a "get_doc" tool that reads a specific documentation file
 *   - Works with both Copilot and Claude Code
 *
 * Why this example:
 *   "Connect your agent to your project's docs" is immediately useful.
 *   Every developer has documentation they wish their tools could read.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, relative } from "path";

// --- Configuration ---
// Point this at any folder with markdown docs
const DOCS_DIR = process.env.DOCS_DIR || "./docs";

// --- Helper: find all .md files recursively ---
function findMarkdownFiles(dir, base = dir) {
  const results = [];
  if (!existsSync(dir)) return results;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".")) {
      results.push(...findMarkdownFiles(fullPath, base));
    } else if (entry.name.endsWith(".md")) {
      results.push({
        path: relative(base, fullPath),
        name: entry.name,
        content: readFileSync(fullPath, "utf-8"),
      });
    }
  }
  return results;
}

// --- Create the MCP server ---
const server = new Server(
  { name: "project-docs", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// --- Tool definitions ---
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_docs",
      description:
        "Search project documentation by keyword. Returns matching file names and a preview of each match.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search keyword or phrase",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_doc",
      description:
        "Read the full contents of a documentation file by its path.",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Relative path to the doc file (from search_docs results)",
          },
        },
        required: ["path"],
      },
    },
  ],
}));

// --- Tool execution ---
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_docs") {
    const query = (args.query || "").toLowerCase();
    const docs = findMarkdownFiles(DOCS_DIR);
    const matches = docs.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.content.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      return {
        content: [{ type: "text", text: `No docs matching "${args.query}"` }],
      };
    }

    const summary = matches
      .map((m) => {
        // Show a preview: first line that contains the query
        const lines = m.content.split("\n");
        const matchLine = lines.find((l) => l.toLowerCase().includes(query)) || lines[0];
        return `- **${m.path}**: ${matchLine.trim().substring(0, 120)}`;
      })
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `Found ${matches.length} doc(s) matching "${args.query}":\n\n${summary}`,
        },
      ],
    };
  }

  if (name === "get_doc") {
    const fullPath = join(DOCS_DIR, args.path);
    if (!existsSync(fullPath)) {
      return {
        content: [{ type: "text", text: `File not found: ${args.path}` }],
      };
    }
    const content = readFileSync(fullPath, "utf-8");
    return {
      content: [{ type: "text", text: content }],
    };
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
  };
});

// --- Start ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Server error:", err);
  process.exit(1);
});
