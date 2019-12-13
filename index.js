const config = require('./src/config');
const logger = require('./src/helpers/logger');
const { applyMigrations } = require('./src/db/migrations');
const { applySeeds } = require('./src/db/seeds');
const createApp = require('./src/app');
const createClient = require('./src/db/create-client');

const createShutdownCallback = (signal, db) => async (error) => {
    if (error) {
        logger.error('App exit with error:', error);
    }

    logger.info('Db disconnect');
    await db.disconnect();
    logger.info('Db disconnection was successful');

    logger.info(`Stop app with ${signal} signal`);
    process.exit(error ? 1 : 0);
};

const prepareApp = async () => {
    await applyMigrations();
    await applySeeds();

    const db = createClient(config.db);
    await db.connect();

    return db;
};

prepareApp()
    .then((db) => {
        process.on('SIGINT', createShutdownCallback('SIGINT', db));
        process.on('SIGTERM', createShutdownCallback('SIGTERM', db));
        process.on('uncaughtException', createShutdownCallback('uncaughtException', db));
        process.on('unhandledRejection', createShutdownCallback('unhandledRejection', db));

        createApp({ db })
            .listen(config.port, () => logger.info('Server is started'));
    })
    .catch(logger.error);
