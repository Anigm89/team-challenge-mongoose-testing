const express = require('express');
const dbConnection = require('./config/config');
const app = express();
const router = require('./routes/posts');
const PORT = 3000;


app.use(express.json());
app.use('/',router);

dbConnection()
app.listen(PORT, () => {
    console.log(`express esta escuchando en el http://localhost:${PORT}`)
})

module.exports = app;