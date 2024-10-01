const express = require('express');
const router = express.Router();
const path = require('path');
const add_task = require('../functions/tasks/add_task');
const task_file_path = path.join(__dirname, '../data/tasks.json');
const fs = require('fs');

router.use(express.json())
router.use(express.urlencoded({ extended: true }));


router.get('/list_tasks', async (req, res) => {
    try {
        let data = await fs.promises.readFile(task_file_path, 'utf-8');
        let tasks = JSON.parse(data);
        res.json(tasks);
    } catch (error) {
        console.log('erro ao ler tarefas, ', error);
        res.status(500).json({ message: 'Erro ao ler tarefas' });
    }
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