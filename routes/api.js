const express = require('express');
const router = express.Router();
const path = require('path');
const add_task = require('../functions/tasks/add_task');
const task_file_path = path.join(__dirname, '../data/tasks.json');
const fs = require('fs');
const Task = require('../models/Tasks');
const update_id = require('../functions/generate_id');

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

router.get('/task/:id', async (req, res) => {

    try {
        let task_requisition = req.params.id;
        let data = await fs.promises.readFile(task_file_path, 'utf-8');
        data = JSON.parse(data);
        let task_to_response = data.find(element => element.id == task_requisition);

        if (task_to_response) {
            res.json(task_to_response);
        } else {
            res.send('Tarefa não encontrada');
        }

    } catch (error) {
        console.log('Houve um erro inesperado, ', error);
        res.status(400).json({ msg: 'Internal server error', error: error.message });
    }
})

router.post('/new_task', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task_id = await update_id('task');
        const task = new Task(id = task_id, title, description, status);
        await add_task(task);
        res.send('tarefa cadastrada com sucesso');

    } catch (error) {
        console.log('Houve o seguinte erro: ', error);
        res.status(500).send("Houve um erro inesperado");

    }
})

router.delete('/del_task/:id', async (req, res) => {
    try {
        let task_to_delete = req.params.id;
        let data = await fs.promises.readFile(task_file_path, 'utf-8');

        data = JSON.parse(data);

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == task_to_delete) {
                data.splice(i, 1);
                break;
            }
        }

        await fs.promises.writeFile(task_file_path, JSON.stringify(data), null, 2);

        res.send('tarefa deletada com sucesso');

    } catch (error) {
        res.status(400).json({ msg: 'internal error', error: error.message })
    }

})

router.put('/update', async (req, res) => {
    try {
        let { _id, _title, _description, _status } = req.body;
        let data = await fs.promises.readFile(task_file_path, 'utf-8');
        data = JSON.parse(data);

        for (let i = 0; i < data.length; i++) {
            if (data[i].id == _id) {
                data[i].title = _title;
                data[i].description = _description;
                data[i].status = _status;
                break;
            }
        }

        await fs.promises.writeFile(task_file_path, JSON.stringify(data));

        res.send('Tarefa modificada com sucesso!');

    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
})

module.exports = router;