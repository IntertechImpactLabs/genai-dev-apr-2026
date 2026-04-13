# Agent output: WITH context file (CLAUDE.md)

**Prompt:** "Add error handling to the POST /api/users route in server.js"

**Same prompt, same agent, same code.** The only change: CLAUDE.md exists in the project root.

---

```js
const { randomUUID } = require('crypto');

// --- Custom error types (structured, with error codes) ---

class AppError extends Error {
  constructor(message, errorCode, statusCode) {
    super(message);
    this.name = 'AppError';
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

class ValidationError extends AppError {
  constructor(detail) {
    super(detail, 'USER_VALIDATION_ERROR', 400);
  }
}

class ConflictError extends AppError {
  constructor(detail) {
    super(detail, 'USER_ALREADY_EXISTS', 409);
  }
}

// --- Correlation ID middleware ---

app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || randomUUID();
  res.setHeader('x-correlation-id', req.correlationId);
  next();
});

// --- Route with structured error handling ---

app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new ValidationError('Name is required and must be a non-empty string.');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError('Email address is required and must be a valid email format.');
    }

    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new ConflictError(`A user with email '${email}' already exists.`);
    }

    const user = { id: nextId++, name: name.trim(), email: email.toLowerCase() };
    users.push(user);

    console.log(JSON.stringify({
      level: 'info',
      correlationId: req.correlationId,
      event: 'user_created',
      userId: user.id,
    }));

    res.status(201).json(user);
  } catch (error) {
    console.error(JSON.stringify({
      level: 'error',
      correlationId: req.correlationId,
      errorCode: error.errorCode || 'INTERNAL_ERROR',
      message: error.message,
      stack: error.stack,
    }));

    const status = error.statusCode || 500;
    res.status(status).json({
      type: `https://api.example.com/errors/${(error.errorCode || 'internal-error').toLowerCase().replace(/_/g, '-')}`,
      title: error.name || 'Internal Server Error',
      status,
      detail: error.message || 'An unexpected error occurred.',
      instance: req.originalUrl,
      correlationId: req.correlationId,
    });
  }
});
```

---

**What to notice — all three conventions from CLAUDE.md are present:**

1. **Structured error types:** `ValidationError`, `ConflictError` with machine-readable codes (`USER_VALIDATION_ERROR`, `USER_ALREADY_EXISTS`)
2. **Correlation ID logging:** UUID middleware, every log line includes `correlationId`, response header set
3. **RFC 7807 format:** Response includes `type`, `title`, `status`, `detail`, `instance`, plus the correlation ID

The agent wasn't told to follow these conventions in the prompt. It read them from the project's CLAUDE.md file automatically.
