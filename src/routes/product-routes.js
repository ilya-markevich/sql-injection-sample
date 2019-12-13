const makeProductService = require('../services/product-service');

module.exports = (route, { db }) => {
    const productService = makeProductService({ db });

    const makeHandler = (findProducts) => async (ctx) => {
        ctx.body = await findProducts(ctx.query.search);
        ctx.status = 200;
    };

    route.get('/unsafeSearch', makeHandler(productService.findProducts));

    route.get('/searchWithoutError', makeHandler(productService.findProductsSafe));

    route.get('/safeSearch', makeHandler(productService.findProductsSafest));

    return route;
};
