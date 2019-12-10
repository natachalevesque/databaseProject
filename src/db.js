const { Client } = require('pg');

async function db() {

    const client = new Client();
    await client.connect();
    return client;

};

module.exports = db;



