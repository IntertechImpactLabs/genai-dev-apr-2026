---
name: code-review
description: Review code changes against team standards. Use when asked to review code, a PR, or a diff.
---

# Code Review Checklist

Review code changes against our team's standards. Use this skill whenever asked to review code, a PR, or a diff.

## Checklist

When reviewing code, check each of the following and report findings:

### 1. Error Handling
- Are all async operations wrapped in try/catch or .catch()?
- Do error responses include machine-readable error codes?
- Are errors logged with correlation IDs?
- Is the error boundary clear (where does the error get handled)?

### 2. Input Validation
- Are all user inputs validated before use?
- Are validation errors returned with specific field-level messages?
- Is there protection against injection (SQL, XSS, command)?

### 3. Security
- Are sensitive values (tokens, keys, PII) excluded from logs?
- Are authorization checks present on protected endpoints?
- Is rate limiting considered for public endpoints?

### 4. Testing
- Do new functions have corresponding test cases?
- Are edge cases covered (null, empty, boundary values)?
- Are error paths tested, not just happy paths?

### 5. Code Clarity
- Are function and variable names descriptive without abbreviation?
- Are magic numbers replaced with named constants?
- Is complex logic explained with a brief comment?

## Output format

For each item, report one of:
- **PASS** — meets the standard
- **FAIL** — does not meet the standard (explain why and suggest a fix)
- **N/A** — not applicable to this change

Summarize with a count: "X of Y checks passed. Z items need attention."
