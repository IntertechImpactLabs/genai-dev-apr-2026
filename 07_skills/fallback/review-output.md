# Code Review: handlers/createOrder.js

Using team code review checklist.

---

## 1. Error Handling

- **FAIL** — No try/catch on any async database operation. If `db.query()` throws, the request hangs with an unhandled promise rejection. Wrap the handler body in try/catch and return a 500 response with a structured error.
- **FAIL** — No error response codes. The 404 for missing user uses a plain `{ error }` object instead of a machine-readable error code.
- **FAIL** — No correlation ID in any response or log.

## 2. Input Validation

- **FAIL** — `userId` is used directly from `req.body` without type checking or validation. Could be undefined, null, or a non-numeric string.
- **FAIL** — `items` array is not validated. No check for empty array, missing `productId`, or negative `quantity`.
- **FAIL** — No validation that products exist before deducting stock. If a product doesn't exist, `product.price` will throw.

## 3. Security

- **FAIL** — **SQL injection vulnerability.** All queries use string interpolation (`${userId}`, `${item.productId}`, `${item.quantity}`). Use parameterized queries instead.
- **FAIL** — **Sensitive data in logs.** Line 40 logs `req.headers.authorization`, which contains the user's bearer token. This token will appear in log storage and could be leaked.
- **N/A** — Rate limiting (not applicable to individual handler).

## 4. Testing

- **FAIL** — No test file exists for this handler.
- **N/A** — Edge cases and error paths (no tests exist at all).

## 5. Code Clarity

- **FAIL** — Magic number `0.9` on line 33. Extract to a named constant like `const BULK_DISCOUNT_RATE = 0.9`.
- **FAIL** — Magic number `100` on line 32 (discount threshold). Extract to `const DISCOUNT_THRESHOLD = 100`.
- **PASS** — Function and variable names are descriptive.

---

## Summary

**3 of 15 checks passed. 12 items need attention.**

Critical issues (fix immediately):
1. SQL injection in all database queries
2. Auth token logged in plaintext
3. No error handling on async operations

High priority:
4. Input validation for userId and items
5. Add test file with happy path and error cases
6. Extract magic numbers to constants
