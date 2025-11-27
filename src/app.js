// src/app.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { PrismaClient} from "@prisma/client";

// Importar rutas correctamente
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// -----------------------------------------------------
// 🔐 CORS CONFIGURATION
// -----------------------------------------------------

/*
  Si existe un front, reemplaza origin por:
      origin: "http://localhost:5173"
      origin: "https://midominio.com"
  Por ahora se permite todo, pero queda documentado.
*/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// -----------------------------------------------------
// 🚫 RATE LIMITING
// -----------------------------------------------------

// Limitador general (toda la API)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes desde esta IP. Intenta más tarde.",
});

// Aplicar a toda la API
app.use(generalLimiter);

// Limitador exclusivo para autenticación
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Demasiados intentos de login. Intenta nuevamente en un minuto.",
});

// Limitador para tasks (opcional)
const tasksLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Demasiadas solicitudes a /tasks. Intenta luego.",
});

// -----------------------------------------------------
// Middlewares globales
// -----------------------------------------------------
app.use(express.json());

// -----------------------------------------------------
// Rutas con limitadores especiales
// -----------------------------------------------------
app.use("/auth", authLimiter, authRoutes);
app.use("/tasks", tasksLimiter, tasksRoutes);

// -----------------------------------------------------
// Ruta raíz
// -----------------------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// -----------------------------------------------------
// Iniciar servidor
// -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
