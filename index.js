const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors')
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/', routes);

const MONGO = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_INST: process.env.DB_INST
}

const mongoUrl = `${MONGO.DB_HOST}://${MONGO.DB_USER}:${MONGO.DB_PASS}@${MONGO.DB_NAME}/${MONGO.DB_INST}?retryWrites=true&w=majority`

mongoose.connect(mongoUrl).then(() => {
    app.listen(3000, () => {
        console.log('La app esta funcionando...');
    });
}).catch(err => {
    console.log('No se pudo conectar...', err);
})