const express = require('express');
const app = express();

app.use(express.json());

// In-memory store (for demo purposes)
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
];
let nextId = 3;

// GET /api/users - list all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:id - get a single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
});

// POST /api/users - create a new user
// NOTE: This is the route we'll ask the agent to add error handling to.
// It currently has NO validation, NO error handling, and NO structured responses.
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

// PUT /api/users/:id - update a user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
