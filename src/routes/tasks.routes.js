// -----------------------------------------
// Importaciones
// -----------------------------------------
import express from 'express';
const router = express.Router();

import passport from 'passport';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Importamos controladores
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller.js';

// Importamos middleware de autenticación
import auth from "../middlewares/authMiddleware.js";


// -----------------------------------------
// Rutas protegidas con auth
// -----------------------------------------
// Estas son las rutas CORRECTAS. 
// Protegidas y usando tus controladores correctamente.
// Las rutas duplicadas e inválidas fueron removidas.

router.get('/', auth, getTasks);          // Obtener tareas
router.post('/', auth, createTask);       // Crear tarea
router.put('/:id', auth, updateTask);     // Actualizar tarea
router.delete('/:id', auth, deleteTask);  // Eliminar tarea


// -----------------------------------------
// Ejemplo: ruta usando passport (opcional)
// -----------------------------------------
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  getTasks // Puedes cambiarlo por otro método si deseas
);


// -----------------------------------------
// NOTA IMPORTANTE:
// -----------------------------------------
// ❌ Las líneas:
//    const tasks = await prisma.task.findMany(...)
//    const task = await prisma.task.create(...)
// Estaban fuera de cualquier ruta → ERROR.
// Fueron eliminadas porque NO pueden usarse ahí.
//
// Si necesitas estas operaciones, deben estar dentro
// de un controlador o dentro de una ruta.
// -----------------------------------------


// -----------------------------------------
// Exportación del router
// -----------------------------------------
export default router;
