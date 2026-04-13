import express from "express";
import { usersRouter } from "./routes/users";

export const app = express();

app.use(express.json());

app.use("/users", usersRouter);

export const startTime = Date.now();
