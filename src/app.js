// src/app.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient } from "@prisma/client";

import passport from "passport";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Rate limiter general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

const tasksLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use("/auth", authLimiter, authRoutes);
app.use("/tasks", tasksLimiter, tasksRoutes);

app.get("/", (req, res) => res.json({ message: "API running" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
