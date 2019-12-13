const logger = require('../helpers/logger');

module.exports = (app) => {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            logger.error(err);

            ctx.body = err;
            ctx.status = 400;
        }
    });
};
