const Koa = require('koa');
const configApp = require('./app-configuration');

module.exports = ({ db }) => {
    const app = new Koa();

    configApp(app, { db });
    return app;
};
