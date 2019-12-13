const path = require('path');
const views = require('koa-views');
const config = require('../config');

module.exports = (app) => {
    const viewsDirPath = path.join(process.cwd(), config.viewsDir);
    app.use(views(viewsDirPath, { map: { html: 'underscore' } }));
};
