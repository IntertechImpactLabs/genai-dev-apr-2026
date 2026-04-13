# D9: Subagents in Action

**Section:** 5. MCP, Skills & Orchestration | **Duration:** 8 min | **Type:** Live terminal + conceptual walkthrough

## Point it proves

Complex tasks are handled by composing specialized agents, not by making one agent do everything. This is the same pattern behind Copilot Coding Agent, Claude Code's subagents, and multi-agent frameworks.

## Prerequisites

- Claude Code installed (subagent delegation is most visible here)
- A project with multiple files to work with (the `06_refactoring/` project works well)

## Setup slide talking points

> "We've connected agents to tools (MCP) and taught them skills. But real-world tasks often need multiple specialists. Writing code, running tests, updating docs — these are different jobs. Modern agents handle this by delegating to subagents."

## Two-part demo

This demo has two halves: first, watch orchestration happen naturally in a coding agent. Second, look at the architecture diagram to understand what happened under the hood.

---

## Part A: Watch subagent delegation (5 min)

### The prompt

Give Claude Code a task that requires multiple distinct activities:

```
Add a health check endpoint to the Express app. It should check database connectivity 
and return status information. Write the endpoint, add a test for it, and update the 
README with the new endpoint documentation.
```

This naturally splits into three subtasks:
1. Write the health check endpoint (code)
2. Write a test (testing)
3. Update README (documentation)

### What to watch for

**In Claude Code** (which uses subagents visibly):
- The main agent will plan the approach
- It may spawn subagents for distinct tasks (visible as "Task" tool calls in verbose mode)
- Each subtask runs independently with its own context
- Results flow back to the parent agent

**What to narrate:**

| Phase | What you see | What to say |
|-------|-------------|-------------|
| Planning | Agent outlines the three subtasks | "The orchestrator is decomposing the task. Three jobs: code, test, docs." |
| Delegation | Agent works on each subtask (or spawns subagents) | "Each subtask gets its own focused context. The agent working on tests doesn't need the README in its context window." |
| Integration | Agent reviews all changes together | "The orchestrator checks that everything is consistent — the test covers the endpoint, the README matches the implementation." |

**What to say after:**
> "You just watched orchestration happen. One task, three specialists, coordinated by an orchestrator. In Claude Code this happens through subagent spawning. In Copilot it happens through agent mode's internal planning. The pattern is the same."

---

## Part B: Architecture diagram (3 min)

Show this diagram on a slide or whiteboard:

```
                    ┌─────────────────┐
                    │   Orchestrator   │
                    │  (main agent)    │
                    └───────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────▼─────┐ ┌────▼──────┐ ┌────▼──────┐
        │  Code      │ │  Test     │ │  Docs     │
        │  Agent     │ │  Agent    │ │  Agent    │
        └─────┬─────┘ └────┬──────┘ └────┬──────┘
              │             │             │
        ┌─────▼─────┐ ┌────▼──────┐ ┌────▼──────┐
        │  File      │ │  Test     │ │  File     │
        │  System    │ │  Runner   │ │  System   │
        │  (MCP)     │ │  (MCP)    │ │  (MCP)    │
        └───────────┘ └───────────┘ └───────────┘
```

### What to explain

**Three orchestration patterns:**

1. **Subagents (agents-as-tools):** The orchestrator spawns specialized agents as tools. Each subagent has its own system prompt, tools, and context. This is what Claude Code does with its Task tool.

2. **Handoffs:** One agent transfers the conversation to another agent with a different specialization. The receiving agent picks up where the previous one left off. Common in customer service bots and multi-step workflows.

3. **Pipeline:** Agents run in sequence — the output of one feeds the input of the next. Common in content workflows (research → draft → review → publish).

**What to say:**
> "These three patterns cover most real-world orchestration. Subagents for parallel independent work. Handoffs for sequential specialization. Pipelines for staged workflows. When we build custom agents in the next section, you'll see how to implement the subagent pattern yourself."

## Debrief (included in Part B)

> "The key insight: you don't make one agent smarter by giving it more tools and more context. You make the system smarter by composing focused agents. Each agent has a narrow job, a focused context, and the right tools. The orchestrator coordinates. This is how every serious agent system works in 2026."

## Fallback plan

If the live demo is slow or the subagent behavior isn't clearly visible:
- Switch to Part B immediately (the architecture diagram is the core teaching)
- Use the pre-captured session in `fallback/` to narrate the delegation pattern
- The teaching point lands from the diagram + explanation even without live demo

## Connection to D10 (Custom Agents)

Transition with:
> "You've now seen the full toolkit: MCP for tools, Skills for capabilities, orchestration for composition. In the next section, we'll build an agent from scratch — and you'll see that the same loop powering all of this is about 30 lines of code."
