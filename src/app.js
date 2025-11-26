const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API running'));

module.exports = app;
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

