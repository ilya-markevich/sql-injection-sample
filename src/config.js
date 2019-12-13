require('dotenv').config();

const path = require('path');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const isTest = env === 'test';

module.exports = {
    port: 3000,
    db: {
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        host: isProduction || isTest ? 'db' : 'localhost',
        port: 5432,
    },
    viewsDir: path.join('src', 'views'),
};
