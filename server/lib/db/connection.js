"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
pool.on('connect', client => {
    console.log('Postgres database connected');
});
pool.on('error', err => {
    console.error('Database error!', err);
});
exports.default = pool;
