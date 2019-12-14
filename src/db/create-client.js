const { Client } = require('pg');
const logger = require('../helpers/logger');

const CONNECTION_ATTEMPTS_COUNT = 4;

module.exports = (dbOpts) => {
    let client;

    const delayedConnect = async (delay) => {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        client = new Client(dbOpts);
        await client.connect();
    };

    const connectWithReconnection = async (attemptNumber) => {
        if (attemptNumber > CONNECTION_ATTEMPTS_COUNT) {
            return Promise.reject(new Error("Can't connect to database"));
        }

        try {
            const delay = attemptNumber * attemptNumber;
            logger.info(`Connection to database: attempt ${attemptNumber} with delay ${delay} second(s)`);
            await delayedConnect(delay);
            logger.info('Successfully connected');
            return Promise.resolve();
        } catch (err) {
            logger.error(err);
            await client.end();
            return connectWithReconnection(attemptNumber + 1);
        }
    };

    const connect = () => connectWithReconnection(1);

    const disconnect = () => client.end();

    const execQueryRaw = (query) => client.query(query);

    const execQuery = (query, params) => client.query(query, params);

    return {
        connect,
        disconnect,
        execQueryRaw,
        execQuery,
    };
};
