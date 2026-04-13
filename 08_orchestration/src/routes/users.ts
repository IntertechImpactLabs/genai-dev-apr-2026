import { Router, Request, Response } from "express";
import { pool } from "../db";

export const usersRouter = Router();

usersRouter.get("/", async (_req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const result = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = ?",
    [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(result.rows[0]);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  res.status(201).json(result.rows[0]);
});
