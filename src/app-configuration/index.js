const configViews = require('./views');
const configBodyParser = require('./body-parser');
const configErrorHandling = require('./error-handler');
const configRoutes = require('../routes');

module.exports = (app, opts) => {
    configViews(app);
    configBodyParser(app);
    configErrorHandling(app);
    configRoutes(app, opts);
};
