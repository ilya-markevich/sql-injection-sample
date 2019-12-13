const config = require('../../config');
const logger = require('../../helpers/logger');
const dbClient = require('../create-client')(config.db);
const productSeed = require('./fill-product-table');
const userSeed = require('./fill-user-table');

const seedsList = [
    productSeed,
    userSeed,
];

const createSeedTable = (client) => client.execQueryRaw(`
CREATE TABLE IF NOT EXISTS seed (
   id serial PRIMARY KEY,
   name VARCHAR (100) UNIQUE NOT NULL,
   created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`);

const isSeedWasApplied = async (client, seedName) => {
    const { rows } = await client.execQuery('SELECT * FROM seed WHERE name=$1', [seedName]);
    return rows.length > 0;
};

const rememberThatSeedWasApplied = (client, seedName) => client.execQuery('INSERT INTO seed(name) VALUES($1)', [seedName]);

const applyDbSeed = async (client, seed) => {
    const wasApplied = await isSeedWasApplied(client, seed.name);

    if (!wasApplied) {
        logger.info(`SEED: seed "${seed.name}" started`);
        await seed.apply(client);
        logger.info(`SEED: seed "${seed.name}" was applied`);
        return rememberThatSeedWasApplied(client, seed.name);
    }

    logger.info(`SEED: seed "${seed.name}" was already applied`);
    return true;
};

const applyDbSeeds = (client, seeds) => seeds.reduce(
    (res, seed) => res.then(() => applyDbSeed(client, seed)),
    Promise.resolve(),
);

const applySeeds = async () => {
    logger.info('SEED: Start applying seeds...');

    try {
        await dbClient.connect();

        await createSeedTable(dbClient);
        await applyDbSeeds(dbClient, seedsList);

        await dbClient.disconnect();
        logger.info('SEED: Seeds were successfully applied');
    } catch (err) {
        logger.error('SEED: Error applying seeds: ', err);
    }
};

module.exports = {
    applySeeds,
};
