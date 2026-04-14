"""
D10: Build an Agent in 30 Lines

A minimal agent that reviews code files for bugs and style issues.
This is the demo code — meant to be walked through line by line on screen.

Uses the Claude Agent SDK (pip install claude-agent-sdk).
Requires ANTHROPIC_API_KEY in environment.
"""

import asyncio
import json
from claude_agent_sdk import (
    query, ClaudeAgentOptions,
    AssistantMessage, UserMessage, ResultMessage,
    TextBlock, ToolUseBlock, ThinkingBlock, ToolResultBlock,
)


async def main():
    # The entire agent is this function call + a loop to process messages.
    # The SDK handles the agent loop: observe → plan → act → evaluate.

    async for message in query(
        # The task we're giving the agent
        prompt="Review server.js for security issues and bugs. List each issue with severity and a suggested fix.",

        options=ClaudeAgentOptions(
            # The agent's identity and expertise
            system_prompt=(
                "You are a senior security engineer. "
                "Review code for vulnerabilities, bugs, and anti-patterns. "
                "Be specific: cite line numbers, explain the risk, suggest a fix."
            ),

            # The tools the agent can use (built-in file tools)
            allowed_tools=["Read", "Glob", "Grep"],

            # Don't let it edit files — read-only review
            permission_mode="default",
        ),
    ):
        # Each message is a step in the agent loop
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, ThinkingBlock):
                    print(f"\n[Thinking]\n{block.thinking}\n")
                elif isinstance(block, ToolUseBlock):
                    args = json.dumps(block.input, indent=2) if block.input else ""
                    print(f"\n[Tool: {block.name}]\n{args}")
                elif isinstance(block, TextBlock):
                    print(block.text)

        elif isinstance(message, UserMessage):
            # Tool results stream back as UserMessages
            if isinstance(message.content, list):
                for block in message.content:
                    if isinstance(block, ToolResultBlock):
                        preview = str(block.content or "")[:300]
                        status = "error" if block.is_error else "ok"
                        print(f"\n[Result ({status})]\n{preview}")

        elif isinstance(message, ResultMessage):
            print(f"\n--- Agent finished ({message.subtype}) ---")


if __name__ == "__main__":
    asyncio.run(main())
