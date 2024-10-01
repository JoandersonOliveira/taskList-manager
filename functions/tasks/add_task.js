const fs = require('fs');
const path = require('path');
const task_file_path = path.join(__dirname, '../../data/tasks.json');

async function add_task(task) {
    const data = await fs.promises.readFile(task_file_path, 'utf-8');
    const tasks = JSON.parse(data);

    tasks.push(task);
    await fs.promises.writeFile(task_file_path, JSON.stringify(tasks));

    return task;
}

module.exports = add_task;
