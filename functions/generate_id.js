const path = require('path');
const fs = require('fs');
const { json } = require('express');
const task_id_path = path.join(__dirname, '../data/last_task_id.json');
const user_id_path = path.join(__dirname, '../data/last_user_id.json');


async function update_id(_data) {
    let data = _data;

    if (data == 'task') {
        let task = await fs.promises.readFile(task_id_path, 'utf-8');
        let data = JSON.parse(task);
        data.id += 1;
        await fs.promises.writeFile(task_id_path, JSON.stringify(data));
        let { id } = data;
        return id;
    }

    if (data == 'user') {
        let user = await fs.promises.readFile(user_id_path, 'utf-8');
        let data = JSON.parse(user);
        data.id += 1;
        await fs.promises.writeFile(user_id_path, JSON.stringify(data));
        let {id} = data;
        return id;

    }
}

module.exports = update_id;