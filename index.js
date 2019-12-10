require('dotenv').config();
const database = require ('./src/db');
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index')
});

app.get('/search', async(request, response) => {

    const client = await database();
    const result = await client.query('SELECT * FROM space.star');
    response.render('search', {results: result.rows});

});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});