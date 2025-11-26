const prisma = require('../prismaClient');

async function listTasks(req, res) {
  try {
    // temporal: listar todas las tareas (auth vendrá luego)
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({ data: { title, description } });
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status },
    });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
