# Agent output: WITHOUT context file

**Prompt:** "Add error handling to the POST /api/users route in server.js"

---

```js
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check for duplicate email
    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

**What to notice:** It works. It validates input and catches errors. But it's generic:
- Errors are plain `{ message: "..." }` objects — no error codes, no machine-readable types
- Logging is `console.error` — no correlation ID, no structure
- The 500 response gives the client nothing useful for debugging
- No consistency guarantee — another developer would handle errors differently
