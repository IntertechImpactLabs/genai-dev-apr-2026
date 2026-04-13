import request from "supertest";
import { app } from "../src/app";
import { pool } from "../src/db";

afterAll(async () => {
  await pool.end();
});

describe("GET /users", () => {
  it("returns an array of users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("GET /users/:id", () => {
  it("returns 404 for a non-existent user", async () => {
    const res = await request(app).get("/users/999999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /users", () => {
  it("returns 400 when fields are missing", async () => {
    const res = await request(app).post("/users").send({ name: "Alice" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
