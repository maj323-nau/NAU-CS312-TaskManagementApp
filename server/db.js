
const { Pool } = require('pg');
require('dotenv').config();

console.log('Database:', process.env.DB_NAME);
console.log('User:', process.env.DB_USER);
console.log('Password exists:', typeof process.env.DB_PASSWORD === 'string' &&
    process.env.DB_PASSWORD.length > 0);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;
