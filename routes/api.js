const express = require('express');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }));


router.get('/list_tasks', (req, res) => {
    res.send('listando todas as tarefas')
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