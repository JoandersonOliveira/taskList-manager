const express = require('express');
const router = express.Router();
const path = require('path');
const add_task = require('../functions/tasks/add_task');
const task_file_path = path.join(__dirname, '../data/tasks.json');
const fs = require('fs');

router.use(express.json())
router.use(express.urlencoded({ extended: true }));


router.get('/list_tasks', async (req, res) => {
    let data = fs.promises.readFile(task_file_path, 'utf-8');
    let tasks = JSON.stringify(data)
    res.json(tasks);
})

router.get('/task', (req, res) => {
    res.send('listando apenas uma tarefa')

})

router.post('/new_task', (req, res) => {
    res.send('cadastrando nova tarefa')

})

router.delete('/del_task/:id', (req, res) => {
    res.send('teste delete')

})

module.exports = router;