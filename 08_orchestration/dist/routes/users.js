"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/", async (_req, res) => {
    const result = await db_1.pool.query("SELECT id, name, email, created_at FROM users ORDER BY created_at DESC");
    res.json(result.rows);
});
exports.usersRouter.get("/:id", async (req, res) => {
    const result = await db_1.pool.query("SELECT id, name, email, created_at FROM users WHERE id = ?", [req.params.id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
});
exports.usersRouter.post("/", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required" });
    }
    const result = await db_1.pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
    res.status(201).json(result.rows[0]);
});
