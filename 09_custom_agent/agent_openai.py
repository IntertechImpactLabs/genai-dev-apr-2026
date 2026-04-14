"""
D10: Build an Agent — OpenAI Agents SDK version

Same concept, different SDK. Shown as a comparison to demonstrate
that the agent pattern is universal across providers.

Uses the OpenAI Agents SDK (pip install openai-agents).
Requires OPENAI_API_KEY in environment.
"""

import asyncio
import json
from agents import Agent, Runner, function_tool
from agents.stream_events import RawResponsesStreamEvent, RunItemStreamEvent


# Define tools the agent can use
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


# Create the agent with a system prompt and tools
agent = Agent(
    name="Security Reviewer",
    instructions=(
        "You are a senior security engineer. "
        "Review code for vulnerabilities, bugs, and anti-patterns. "
        "Be specific: cite line numbers, explain the risk, suggest a fix."
    ),
    tools=[list_directory, read_file],
)


async def main():
    result = Runner.run_streamed(
        agent,
        "Review the server code for security issues and bugs."
    )

    async for event in result.stream_events():
        if isinstance(event, RawResponsesStreamEvent):
            # Stream text tokens as they arrive
            data = event.data
            if data.type == "response.output_text.delta":
                print(data.delta, end="", flush=True)
        elif isinstance(event, RunItemStreamEvent):
            if event.name == "tool_called":
                tool = event.item.raw_item
                try:
                    args = json.dumps(json.loads(tool.arguments), indent=2)
                except Exception:
                    args = tool.arguments
                print(f"\n[Tool: {tool.name}]\n{args}")
            elif event.name == "tool_output":
                preview = str(event.item.output)[:300]
                print(f"\n[Result]\n{preview}")

    print("\n--- Agent finished ---")


if __name__ == "__main__":
    asyncio.run(main())
