require('dotenv').config();
const database = require ('./src/db');
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'pg',
    version: '11.5',
    connection: {
        host : 'localhost',
        user : 'natachalevesque',
        password : '',
        database : 'space'
    }
});
const app = express();
const port = 3000;

app.use(express.static('assets'));

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
    const table = request.query.celestBody;
    const name = request.query.name;
    const result = await client.query(

        knex.select().from( table )
            .toString()

    );

    response.render('search', {results: result.rows});

});

app.get('/result', (request, response) => {

    response.json({ ok: request.query.name})
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});