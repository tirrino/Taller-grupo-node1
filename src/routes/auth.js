// src/routes/auth.routes.js
import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';

// Ruta para registrar usuario (Integrante A)
router.post('/register', register);

// Ruta para hacer login (Integrante B)
router.post('/login', login);

export default router;