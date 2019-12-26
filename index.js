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


    const spectralType = request.query.spectralType;
    const binarySystem = request.query.binarySystem;

    const host = request.query.host;
    const rings = request.query.rings;

    const moon_orbits = request.query.orbits;

    const yearDiscovered = request.query.yearDiscovered;
    const discoverer = request.query.discoverer;

    const searchByName = request.query.searchByName;

    let table;
    let searchQuery;

    if( searchByName ) {
        table = 'celestialbody';
        searchQuery = knex.select().from('celestialbody').where('name', searchByName)
    }
    else {
        table = request.query.celestBody;
        searchQuery = knex.select().from( table );
    }

    if( table === 'star' ) {

        if( binarySystem ) {
            searchQuery.innerJoin('binarysystem', 'starone', 'name')
        }

        if( spectralType ) {
            searchQuery = searchQuery.where('spectral_type', spectralType);
        }

    }

    if( table === 'planet' ) {

        if( host ) {
            searchQuery = searchQuery.where('host', host);
        }

        if( rings ) {
            searchQuery = searchQuery.where('rings', rings);
        }

    }

    if( table === 'moon' ) {

        if( moon_orbits ) {
            searchQuery = searchQuery.where('moon_orbits', moon_orbits);
        }

    }

    if( table === 'comet' || table === 'asteroid' ) {

        if( discoverer ) {
            searchQuery = searchQuery.where('discoverer', discoverer);
        }

        if( yearDiscovered ) {
            searchQuery = searchQuery.where('year_discovered', yearDiscovered )
        }

    }

    console.log(searchQuery.toString());

    const result = await client.query( searchQuery.toString() );

    response.render('search', {results: result.rows, table});

});

app.get('/result', async(request, response) => {

    const client = await database();
    const name = request.query.name;

    let result;
    let type = request.query.type;
    let types = ['star', 'planet', 'moon', 'comet', 'asteroid'];


    if(type === 'celestialbody') {

        type = 'star';

    }

    result = await client.query(

        knex.select().from( type )
            .where('name', name )
            .toString()

    );

    response.render(type, { result: result.rows[0] });


});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});