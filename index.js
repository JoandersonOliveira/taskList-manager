const express = require('express');
const app = express();
const api_routes = require('./routes/api');

const PORT = 3000;

app.use('/api', api_routes);

app.listen(PORT, () => {
    console.log('servidor rodando na porta: ', PORT);
})