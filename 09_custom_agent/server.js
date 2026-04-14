/**
 * Sample server for the agent to review.
 * Has several intentional security and quality issues.
 */
const express = require('express');
const app = express();

app.use(express.json());

const users = [];
const API_KEY = "sk-prod-abc123-secret-key-do-not-share";

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ token: Buffer.from(username + ':' + password).toString('base64') });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  // Simulated DB query
  const user = users[parseInt(req.params.id)];
  res.json(user);
});

// Admin endpoint - delete user
app.delete('/api/users/:id', (req, res) => {
  const idx = parseInt(req.params.id);
  users.splice(idx, 1);
  res.json({ deleted: true });
});

// File download
app.get('/api/files', (req, res) => {
  const filePath = req.query.path;
  res.sendFile(filePath);
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    env: process.env,
    users: users,
    apiKey: API_KEY,
    memory: process.memoryUsage(),
  });
});

app.listen(3000);
