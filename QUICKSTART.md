# GenAI Dev Course — Quick Start Guide

This guide shows you how to open each demo in an isolated dev container for a clean, reproducible environment.

## Prerequisites

- **VS Code** with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **Docker** installed and running
- An OpenAI API key (required for most demos)

## API Key Formats

Add these environment variables to your `.env` file:

```bash
# OpenAI API Key (starts with 'sk-')
OPENAI_API_KEY=sk-your-openai-api-key-here

# Anthropic API Key (starts with 'sk-ant-')
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
```

**Where to get API keys:**

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd genai-dev-course
```

### 2. Create a `.env` file at the root

```bash
cp .env.example .env
# Edit .env with your API keys
```

## Demos Overview

Each demo is in its own numbered folder. Click on the demo title to jump to setup instructions.

| #                                | Demo                       | Focus                                        | Runtime                  |
| -------------------------------- | -------------------------- | -------------------------------------------- | ------------------------ |
| **[01](#01-tool-use)**           | Tool Use Under the Hood    | Foundation: LLM tool-calling loop            | REST Client              |
| **[02](#02-prompt-progression)** | Prompt Progression         | Context engineering: zero-shot to production | TypeScript               |
| **[03](#03-context-files)**      | Context Files in Action    | Project conventions impact                   | Node.js + Claude/Copilot |
| **[04](#04-rag-demo)**           | RAG — The Knowledge Gap    | Semantic search + context injection          | Python Jupyter           |
| **[05](#05-refactoring)**        | Refactoring with AI        | Agent-driven code restructuring              | Node.js + SQLite         |
| **[06](#06-mcp-demo)**           | Connect an MCP Server      | Standard protocol for tool discovery         | Node.js                  |
| **[07](#07-skills)**             | Build a Skill              | Reusable agent capabilities                  | Markdown + Claude Code   |
| **[08](#08-orchestration)**      | Subagents in Action        | Delegating to specialized agents             | TypeScript + Node.js     |
| **[09](#09-custom-agent)**       | Build an Agent in 30 Lines | Custom agent loop from scratch               | Python                   |

---

## Opening a Demo in Dev Container

Each demo runs in its own isolated container because they have different language and dependency requirements (Python, Node.js, TypeScript, etc.).

### Open a demo in its dev container

1. Open the demo folder in VS Code (e.g., `01_tool_use/`)
2. VS Code will detect the `.devcontainer` configuration and show a notification
3. Click **"Reopen in Container"** or use Command Palette → **"Dev Containers: Reopen in Container"**
4. Wait for the container to build and start (~30-60 seconds)
5. The demo is now running in an isolated environment

### Manual approach

If the automatic detection doesn't work:

```bash
cd 01_tool_use  # or any demo folder
# Then use Command Palette → "Dev Containers: Reopen in Container"
```

1. Open the folder in VS Code
2. Command Palette → **"Dev Containers: Reopen in Container"**
