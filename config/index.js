// We are going to create a connection to a database of our choice

require('dotenv').config();
const {createPool} = require('mysql');
let connection = createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    port: process.env.dbPort,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30
})

module.exports = connection
