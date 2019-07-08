var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "localhost",
        user: "root",
        password: "password",
        database: "backend_test"
    }
});

module.exports = knex;