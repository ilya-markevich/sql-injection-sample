const Router = require('koa-router');
const defaultRoutes = require('./default-routes');
const productRoutes = require('./product-routes');

const routesAppliers = [
    defaultRoutes,
    productRoutes,
];

module.exports = (app, opts) => {
    routesAppliers.forEach((routeApplier) => {
        const router = routeApplier(new Router(), opts);

        app
            .use(router.routes())
            .use(router.allowedMethods());
    });
};
