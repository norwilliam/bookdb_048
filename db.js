const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    port: process.env.DBPORT || 3306
});

module.exports = connection.promise();