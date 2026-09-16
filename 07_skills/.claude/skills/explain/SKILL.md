---
name: explain
description: Explain something as a paced, user-driven walkthrough
disable-model-invocation: true
argument-hint: [thing to explain]
---

# Explain step by step

Explain `$ARGUMENTS` as a paced, interactive walkthrough instead of one long answer.

## How to run it

1. If needed, research the topic first (read the relevant code, docs, or history) so each
   step is grounded in what's actually there — don't explain from guesswork.
2. Break the explanation into a logical sequence of steps (e.g. the order pieces were
   built, or the order data/control flow moves through the system).
3. Send **one step at a time**. Each step is **two to three sentences**, in simple,
   plain language — no unexplained jargon.
4. After each step, stop and wait. Do not send the next step until the user says to
   continue (e.g. "continue", "go on", "next"). If they ask a question instead, answer
   it before resuming the sequence.
5. Keep track of where you are in the sequence across turns so "continue" always
   advances to the correct next step.
