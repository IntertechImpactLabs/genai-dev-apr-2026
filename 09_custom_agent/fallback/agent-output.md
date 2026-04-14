# Agent Output: Security Review of server.js

*Pre-captured output for fallback use when API is unavailable.*

---

I'll review `server.js` for security issues and bugs.

Let me read the file first.

## Security Review: server.js

### Critical Issues

**1. Hardcoded API Key (Line 11)** — Severity: CRITICAL
```js
const API_KEY = "sk-prod-abc123-secret-key-do-not-share";
```
A production API key is hardcoded in source code. This will be committed to version control and exposed to anyone with repo access.
**Fix:** Move to environment variable: `const API_KEY = process.env.API_KEY`

**2. SQL Injection (Line 27)** — Severity: CRITICAL
```js
const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
```
User input is interpolated directly into a SQL query. An attacker can inject arbitrary SQL.
**Fix:** Use parameterized queries: `SELECT * FROM users WHERE id = $1` with `[req.params.id]`

**3. Path Traversal (Line 38)** — Severity: CRITICAL
```js
const filePath = req.query.path;
res.sendFile(filePath);
```
User-controlled file path with no sanitization. An attacker can read any file on the server: `/api/files?path=/etc/passwd`
**Fix:** Validate the path is within an allowed directory using `path.resolve()` and a base directory check.

**4. Debug Endpoint Leaking Secrets (Lines 42-48)** — Severity: CRITICAL
```js
res.json({
  env: process.env,
  users: users,
  apiKey: API_KEY,
});
```
Exposes all environment variables (including database credentials, API keys), all user data, and the hardcoded API key. This endpoint should not exist in production.
**Fix:** Remove entirely, or gate behind admin authentication and strip sensitive fields.

### High Severity

**5. Plaintext Password Storage & Comparison (Line 16)** — Severity: HIGH
```js
const user = users.find(u => u.username === username && u.password === password);
```
Passwords are stored and compared in plaintext. If the user store is compromised, all passwords are exposed.
**Fix:** Hash passwords with bcrypt on registration, compare with `bcrypt.compare()` on login.

**6. Insecure Token Generation (Line 18)** — Severity: HIGH
```js
res.json({ token: Buffer.from(username + ':' + password).toString('base64') });
```
The "token" is just base64-encoded `username:password`. Anyone who intercepts it can decode the credentials immediately.
**Fix:** Use JWT with proper signing (e.g., `jsonwebtoken` library).

**7. No Authentication on Admin Endpoint (Line 32)** — Severity: HIGH
```js
app.delete('/api/users/:id', (req, res) => {
```
The delete endpoint has no authentication or authorization check. Anyone can delete any user.
**Fix:** Add authentication middleware and verify admin role.

### Medium Severity

**8. No Input Validation (Lines 15-16)** — Severity: MEDIUM
No validation that `username` and `password` exist in the request body, or that they're strings.
**Fix:** Validate request body shape and types before processing.

**9. Array Index as User ID (Line 28)** — Severity: MEDIUM
```js
const user = users[parseInt(req.params.id)];
```
Using array index as user identifier. `parseInt` returns `NaN` for non-numeric input, and negative indices or out-of-bounds access returns `undefined`.
**Fix:** Use proper ID-based lookup with validation.

---

## Summary

**9 issues found:** 4 critical, 3 high, 2 medium.

The most urgent fixes are the hardcoded API key, SQL injection, and path traversal — these are all actively exploitable. The debug endpoint should be removed before any deployment.

--- Agent finished (end_turn) ---
