require('dotenv').config();

const pg = require("pg");
const Pool = pg.Pool;


// For connecting to db in Azur

const pool = new Pool({
    user : process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: require
});


// For Mr Georges can test in local for the examination :)
/*const pool = new Pool({
    user: process.env.DB_USER_FOR_TESTING_EXAM,
    host: process.env.DB_HOST_FOR_TESTING_EXAM,
    database: process.env.DB_DATABASE_FOR_TESTING_EXAM,
    password: process.env.DB_PASSWORD_FOR_TESTING_EXAM,
    port: process.env.DB_PORT_FOR_TESTING_EXAM,
});*/


module.exports = pool;
