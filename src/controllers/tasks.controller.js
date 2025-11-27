// src/controllers/tasks.controller.js
import prisma from '../prismaClient.js';

// GET /tasks
const getTasks = async (req, res) => {
  try {

    console.log("---------")
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('GET /tasks error:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// POST /tasks
const createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: 'title and userId are required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: parseInt(userId)
      }
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('POST /tasks error:', error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

// PUT /tasks/:id — actualiza título, descripción y estado
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Validamos que el estado venga como "pending" o "done"
    if (status && !['pending', 'done'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status
      }
    });

    res.json(task);
  } catch (error) {
    console.error('PUT /tasks/:id error:', error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('DELETE /tasks/:id error:', error);
    res.status(500).json({ error: 'Error deleting task' });
  }
};

export { getTasks, createTask, updateTask, deleteTask };