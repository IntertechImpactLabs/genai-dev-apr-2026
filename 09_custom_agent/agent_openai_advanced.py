"""
D10: Advanced Agent — OpenAI Agents SDK

Extends the basic agent with three key features:
  1. Guardrails   — input validation to block misuse
  2. Handoffs     — triage agent routes to specialists
  3. Structured Output — typed Pydantic results instead of free text

Uses the OpenAI Agents SDK (pip install openai-agents).
Requires OPENAI_API_KEY in environment.
"""

import asyncio
import json
from pydantic import BaseModel
from agents import (
    Agent,
    GuardrailFunctionOutput,
    InputGuardrailTripwireTriggered,
    ItemHelpers,
    Runner,
    RunContextWrapper,
    function_tool,
    input_guardrail,
)


# ---------------------------------------------------------------------------
# Tools — shared across specialist agents
# ---------------------------------------------------------------------------

@function_tool
def list_directory(path: str = ".") -> str:
    """List the files and directories at the given path."""
    import os
    entries = os.listdir(path)
    return "\n".join(sorted(entries))


@function_tool
def read_file(path: str) -> str:
    """Read and return the contents of a file."""
    with open(path) as f:
        return f.read()


# ---------------------------------------------------------------------------
# Structured Output — the agent returns typed data, not free text
# ---------------------------------------------------------------------------

class Finding(BaseModel):
    file: str
    line: int
    severity: str        # critical, high, medium, low
    category: str        # security, performance, style
    description: str
    fix: str


class ReviewReport(BaseModel):
    findings: list[Finding]
    summary: str


# ---------------------------------------------------------------------------
# Guardrail — block prompts that ask the agent to write exploits
# ---------------------------------------------------------------------------

BLOCKED_PHRASES = ["exploit", "malware", "backdoor"]

@input_guardrail
async def block_exploit_requests(
    ctx: RunContextWrapper, agent: Agent, input: str
) -> GuardrailFunctionOutput:
    """Reject prompts that ask the reviewer to produce offensive code."""
    if isinstance(input, str):
        text = input.lower()
    else:
        text = " ".join(str(item) for item in input).lower()
    triggered = any(phrase in text for phrase in BLOCKED_PHRASES)
    return GuardrailFunctionOutput(
        output_info={"blocked": triggered},
        tripwire_triggered=triggered,
    )


# ---------------------------------------------------------------------------
# Specialist Agents — each focused on one review dimension
# ---------------------------------------------------------------------------

security_agent = Agent(
    name="Security Reviewer",
    instructions=(
        "You are a senior security engineer. "
        "Review code for vulnerabilities: injection, auth flaws, data exposure, "
        "insecure defaults. Cite line numbers, explain the risk, suggest a fix. "
        "Set category to 'security' for every finding."
    ),
    tools=[list_directory, read_file],
    output_type=ReviewReport,
)

performance_agent = Agent(
    name="Performance Reviewer",
    instructions=(
        "You are a performance engineer. "
        "Review code for N+1 queries, missing indexes, blocking calls, "
        "memory leaks, and unnecessary allocations. Cite line numbers. "
        "Set category to 'performance' for every finding."
    ),
    tools=[list_directory, read_file],
    output_type=ReviewReport,
)

style_agent = Agent(
    name="Style Reviewer",
    instructions=(
        "You are a code quality expert. "
        "Review code for readability, naming, dead code, missing error handling, "
        "and anti-patterns. Cite line numbers. "
        "Set category to 'style' for every finding."
    ),
    tools=[list_directory, read_file],
    output_type=ReviewReport,
)


# ---------------------------------------------------------------------------
# Triage Agent — routes to the right specialist via handoffs
# ---------------------------------------------------------------------------

triage_agent = Agent(
    name="Triage",
    instructions=(
        "You are a code review coordinator. Based on the user's request:\n"
        "- Security concerns  → hand off to Security Reviewer\n"
        "- Performance concerns → hand off to Performance Reviewer\n"
        "- Style / quality concerns → hand off to Style Reviewer\n"
        "- General review → hand off to Security Reviewer (default)\n\n"
        "Do NOT review code yourself. Just route to the right specialist."
    ),
    handoffs=[security_agent, performance_agent, style_agent],
    input_guardrails=[block_exploit_requests],
)


# ---------------------------------------------------------------------------
# Main — run with streaming and print results
# ---------------------------------------------------------------------------

async def main():
    # --- Pick a prompt to demo different behaviors ---
    prompt = "Review the server code for security issues and bugs."
    # prompt = "Check the code for performance problems and slow queries."
    # prompt = "Review code style and readability."
    # prompt = "Write an exploit for the login page."  # blocked by guardrail
    # prompt = "Create a backdoor in the server."      # blocked by guardrail
    print(f"Prompt: {prompt}\n")

    try:
        result = Runner.run_streamed(triage_agent, prompt)

        async for event in result.stream_events():
            # Skip raw text deltas — the structured JSON report
            # is printed at the end, so streaming it is just noise.
            if event.type == "agent_updated_stream_event":
                print(f"\n>>> Handed off to: {event.new_agent.name}\n")

            elif event.type == "run_item_stream_event":
                if event.item.type == "tool_call_item":
                    tool = event.item.raw_item
                    try:
                        args = json.dumps(json.loads(tool.arguments), indent=2)
                    except Exception:
                        args = tool.arguments
                    print(f"\n[Tool: {tool.name}]\n{args}")
                elif event.item.type == "tool_call_output_item":
                    preview = str(event.item.output)[:300]
                    print(f"\n[Result]\n{preview}")

    except InputGuardrailTripwireTriggered:
        print("BLOCKED: Input guardrail rejected the prompt.")
        return

    # Print the structured report as formatted JSON
    final = result.final_output
    if isinstance(final, ReviewReport):
        print("\n\n=== Structured Report (JSON) ===\n")
        print(json.dumps(final.model_dump(), indent=2))

    print("\n--- Agent finished ---")


if __name__ == "__main__":
    asyncio.run(main())
