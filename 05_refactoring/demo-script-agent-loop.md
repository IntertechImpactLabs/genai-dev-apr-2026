# D5: Agent Loop Live

**Section:** 3. AI Agents | **Duration:** 12 min | **Type:** Live terminal (Claude Code or Copilot agent mode)

## Point it proves

Agents aren't magic — they run a visible loop of observe → plan → act → evaluate. You can watch it happen in real time. Understanding the loop is what lets you intervene when it goes wrong.

## Prerequisites

- Claude Code installed (preferred — the agent loop is most visible in terminal output) or VS Code with Copilot agent mode
- This project set up: `cd exercises/06_refactoring && npm install && npm run init-db`
- Server should NOT be running (the agent will start it if needed)

## Setup slide talking points

> "We said agents run in a loop: observe the situation, plan what to do, act on the plan, evaluate the result. Let's watch it happen in real time. I'm going to point a coding agent at a messy codebase and give it a real task. Watch for the four phases."

## The codebase

The `06_refactoring/` project is an Express.js app with intentional anti-patterns:
- Database queries scattered across route handlers
- Each route file creates its own database connection
- SQL mixed with business logic
- Duplicate code across files
- No abstraction layer

**Show 2-3 files briefly** before starting the agent so students understand the mess.

## The prompt

Use this exact prompt — it's specific enough to produce consistent results but open enough that the agent has to think:

```
Refactor this Express application to use the repository pattern. Extract all database 
logic from the route handlers into a repositories/ folder with separate files for 
users, products, and orders. Create a shared database connection manager. Keep the 
existing API behavior identical.
```

## Demo steps

### Step 1: Show the mess (2 min)

**What to do:** Open `src/routes/users.js` and `src/routes/orders.js`. Point out the anti-patterns.

**What to say:**
> "Here's our patient. Database connections created in every route file. SQL queries mixed into the handlers. Duplicate code. If you've worked on a real codebase, this probably looks familiar. Now let's watch an agent fix it."

### Step 2: Launch the agent (1 min)

**What to do:** Run the prompt in Claude Code (or Copilot agent mode).

**What to say:**
> "I'm giving the agent a specific task: refactor to the repository pattern. Watch what happens — and specifically, watch for the four phases we just learned about."

### Step 3: Narrate OBSERVE (2 min)

**What to watch for:** The agent will start by reading files. In Claude Code, you'll see it opening `server.js`, route files, and possibly `package.json`.

**What to say:**
> "Phase one: observe. The agent is reading the codebase. It's looking at the route files, the database setup, the package structure. It hasn't changed anything yet — it's building a mental model of what's there. This is the same thing you'd do before refactoring."

**What to point out:** Count the files it reads. "It read 6 files before writing anything. That's the observe phase."

### Step 4: Narrate PLAN (2 min)

**What to watch for:** The agent will describe its approach, either in a thinking block or as output text. Something like: "I'll create a database manager, then repository files, then update the routes."

**What to say:**
> "Phase two: plan. The agent just laid out its approach. It's going to create a shared database connection, then build three repository files, then rewire the routes. This is exactly the plan you'd write on a whiteboard before starting. The difference is the agent does it in seconds."

**What to point out:** "Notice it's not coding yet. It's planning. We'll see in the Planning section why this matters — and what happens when agents skip this step."

### Step 5: Narrate ACT (3 min)

**What to watch for:** The agent creates files (`repositories/`, `database.js`, etc.) and modifies route files. This is the longest phase.

**What to say:**
> "Phase three: act. Now it's writing code. Creating the database manager. Building the user repository. Watch how it's following the plan — it's doing exactly what it said it would do, in order."

**What to point out:** Highlight a specific file creation. "It just created `repositories/userRepository.js` — look, all the SQL that was scattered across the route handler is now in one place."

### Step 6: Narrate EVALUATE (1 min)

**What to watch for:** The agent may run tests, start the server, or review its own changes. In Claude Code, it often does a final check by reading the modified files.

**What to say:**
> "Phase four: evaluate. The agent is checking its work. [If it runs tests:] It just ran the tests to verify the API still works. [If it reviews files:] It's reading through the changes to verify consistency."

**If it doesn't explicitly evaluate:** "In this case the agent moved on without an explicit check. That's actually a common weakness — agents don't always verify their work. This is where human review matters."

### Step 7: Debrief (2 min)

**What to say:**
> "Four phases, visible in the output. Observe — it read 6 files. Plan — it described its approach. Act — it created files and rewired the routes. Evaluate — it checked its work."

> "The agent didn't do anything you couldn't do manually. It did it faster. But the important thing is: you now know what's happening inside the tool. When an agent goes off the rails — and they do — you can identify which phase broke down. Did it observe the wrong files? Did it plan badly? Did it act without planning? Did it skip evaluation? Knowing the loop is how you diagnose and fix agent behavior."

## Fallback plan

If the agent is slow or produces unexpected output:
1. Let it run for 2-3 minutes, then pause
2. Narrate what it's doing based on the output so far
3. If it's stuck, switch to a pre-recorded session

**Pre-record a session before delivery** using `asciinema` or screen recording. Label each phase in the recording for easy reference.

## Common issues

| Issue | Fix |
|-------|-----|
| Agent asks for clarification | Answer it and continue — this is actually a good teaching moment about agent interactivity |
| Agent modifies files you didn't expect | Note it for the Planning section — "this is drift, and we'll learn how to prevent it" |
| Agent is very slow | Narrate what it's doing while waiting. If over 3 min with no output, switch to fallback |
| Database init wasn't run | Run `npm run init-db` before starting |

## Important: Don't contaminate D6

This demo and D6 (Plan vs. No Plan) both use the same codebase. Make sure to reset the project between demos:

```bash
git checkout -- exercises/06_refactoring/
npm run init-db
```
