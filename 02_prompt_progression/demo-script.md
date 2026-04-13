# D2: Prompt Progression — Context Quality = Output Quality

**Section:** 2. Context Engineering | **Duration:** 10 min | **Type:** Pre-generated code comparison

## Point it proves

The same LLM, given the same task, produces dramatically different output depending on the context you provide. Zero-shot is a floor, not a ceiling. Context engineering is the skill.

## Prerequisites

None — all outputs are pre-generated. This is a "show and compare" demo, not a live generation demo. (Generating live adds risk with no teaching benefit here — the point is the *delta between outputs*, not watching it type.)

## Files

- `01_zero_shot/scorePassword.ts` — Output from a bare prompt
- `02_role_based/scorePassword.ts` — Output from a role-based prompt
- `03_role_based_research/` — Output from a CLEAR-style prompt with research context
  - `password-scorer.ts` — The implementation
  - `README.md` — Generated documentation (NIST guidelines, API reference)
  - `examples.ts` — Usage examples
  - `tests.ts` — Generated test suite

## The three prompts

Show these on screen as you walk through each output. The contrast between prompts is as important as the contrast between outputs.

### Prompt 1: Zero-shot (bare minimum)

```
Design a TypeScript password scoring utility function.
```

That's it. No context, no role, no requirements, no examples.

### Prompt 2: Role-based (add expertise)

```
Act as a cybersecurity architect to design a TypeScript password scoring utility function.
```

One addition: a role. Same task, but now the model activates security-domain knowledge.

### Prompt 3: CLEAR framework (full context engineering)

```
CONTEXT:
You are a senior cybersecurity architect building a password strength
evaluator for a production SaaS application. The library must follow
current NIST SP 800-63B guidelines (2024/2025 draft) and use research-
backed scoring rather than arbitrary complexity rules.

LANGUAGE:
TypeScript, strict mode. Target Node.js 18+ and modern browsers.

EXAMPLES:
- Reference the zxcvbn algorithm (USENIX Security '16) for pattern detection
- Use the Have I Been Pwned k-Anonymity API for breach checking
- Score on a 0-4 scale matching zxcvbn conventions

ACTION:
Create a complete password scoring library with:
1. Synchronous scoring function (no network calls)
2. Async scoring function (with HIBP breach check)
3. Pattern detection (dictionary, keyboard, sequences, dates, l33t speak)
4. Entropy calculation with real-world adjustments
5. NIST compliance checking
6. Actionable user feedback (not just "weak/strong")

REQUIREMENTS:
- Export both sync and async functions
- Include full TypeScript interfaces
- Add comprehensive JSDoc documentation
- Generate a README with API reference, usage examples, and design rationale
- Include a test file with edge cases
- No external dependencies except the HIBP API call
```

## Demo steps

### Step 1: Show the task (0.5 min)

**What to say:**
> "We just learned about prompting techniques — zero-shot, role-based, CLEAR framework. Let's see how much they actually matter. Same task, same model, three different prompts. The task: write a password scoring function in TypeScript."

### Step 2: Zero-shot output (2 min)

**Open** `01_zero_shot/scorePassword.ts`

**What to point out:**
- It works. It has some reasonable checks (length, character types, patterns).
- But look at the scoring: arbitrary point system (length * 2, 15 points per check). Where do these numbers come from? The model made them up.
- Hardcoded special character regex. No research basis.
- No concept of entropy, no breach checking, no NIST awareness.
- No documentation, no tests, no usage examples.

**What to say:**
> "This is fine for a toy project. But would you ship this? The scoring is made up. The security model is 'does it have special characters' — which NIST has explicitly said doesn't matter. The model gave us the obvious answer because we gave it zero context."

### Step 3: Role-based output (2 min)

**Open** `02_role_based/scorePassword.ts`

**What to point out:**
- Better structure: score breakdown with named components (length, diversity, patterns, entropy, commonPassword).
- Actually calculates entropy (character pool size × log₂).
- Has a common passwords list.
- Detects keyboard patterns and sequential characters.

**What's still missing:**
- The scoring weights are still arbitrary (25/25/25/15/10 split — why?).
- No NIST reference. No research basis.
- No breach checking.
- No documentation beyond inline comments.

**What to say:**
> "Adding a role helped. The model activated its security knowledge — entropy, common passwords, pattern detection. But it's still improvising the scoring model. It doesn't reference actual standards because we didn't tell it to."

### Step 4: CLEAR framework output (3 min)

**Open** `03_role_based_research/` — show all four files.

**What to point out:**
- **password-scorer.ts**: Full implementation with sync and async functions, pattern detection for 8+ pattern types, real entropy calculation, NIST compliance checking, HIBP integration with k-Anonymity.
- **README.md**: Complete documentation with API reference, NIST guideline summary, design rationale, crack time calculations, references to actual papers and standards.
- **examples.ts**: Three real-world usage patterns (registration form, strength meter, breach checking).
- **tests.ts**: Edge cases, boundary conditions, pattern detection verification.

**The money shot:** Show the NIST comparison table in the README:
> Old approach: Require complexity rules → New approach: Prioritize length (15+ chars)

**What to say:**
> "Same model. Same task. Same temperature. The only thing that changed was the context we provided. We gave it a role, a research basis, specific standards to follow, concrete output requirements, and examples to reference. The model didn't get smarter — we got better at telling it what we needed."

### Step 5: Debrief (1 min)

**What to say:**
> "This is context engineering in a nutshell. Zero-shot gives you the median answer from the training data. Each layer of context — role, examples, requirements, research basis — pulls the output toward the expert end of the distribution. The CLEAR framework isn't magic. It's a checklist for not leaving context on the table."

## Fallback plan

This demo doesn't need a fallback — all outputs are pre-generated files. If you need to re-generate live for some reason, use the prompts above with Claude (Opus or Sonnet) or GPT-4+.

## Tip for instructors

Resist the urge to spend too long on the CLEAR output. The teaching moment is the *delta*, not the details. Students will want to read the README afterward — let them. The point is: "look how different this is," not "let me walk through every function."
