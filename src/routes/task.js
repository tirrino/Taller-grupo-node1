// src/routes/tasks.routes.js
import express from 'express';
const router = express.Router();

import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller.js';

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, controller.listTasks);
router.post('/', auth, controller.createTask);
router.put('/:id', auth, controller.updateTask);
router.delete('/:id', auth, controller.deleteTask);
const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
const task = await prisma.task.create({ data: { title, description, userId: req.user.id } });
const passport = require('passport');
router.get('/', passport.authenticate('jwt', { session: false }), controller.listTasks);

