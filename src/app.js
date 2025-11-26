// const express = require('express');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const taskRoutes = require('./routes/tasks.routes.js');
// app.use('/tasks', taskRoutes);

// app.get('/', (req, res) => {
//   res.json({ message: 'API running' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// src/app.js
import authRoutes from "./routes/auth.js";
import tasksRoutes from './routes/task.js';
import express from "express";
import dotenv from 'dotenv'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
