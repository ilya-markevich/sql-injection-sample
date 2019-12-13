const config = require('../../config');
const logger = require('../../helpers/logger');
const dbClient = require('../create-client')(config.db);
const createUserTableMigration = require('./create-user-table');
const createProductTableMigration = require('./create-products-table');

const migrationsList = [
    createUserTableMigration,
    createProductTableMigration,
];

const createMigrationTable = (client) => client.execQueryRaw(`
CREATE TABLE IF NOT EXISTS migration (
   id serial PRIMARY KEY,
   name VARCHAR (100) UNIQUE NOT NULL,
   created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`);

const isMigrationWasApplied = async (client, migrationName) => {
    const res = await client.execQuery('SELECT * FROM migration WHERE name=$1', [migrationName]);
    return res.rows.length > 0;
};

const rememberThatMigrationWasApplied = (client, migrationName) => client.execQuery(`
    INSERT INTO migration(name) VALUES($1)
`, [migrationName]);

const applyDbMigration = async (client, migration) => {
    const wasApplied = await isMigrationWasApplied(client, migration.name);

    if (!wasApplied) {
        logger.info(`MIGRATION: migration "${migration.name}" started`);
        await migration.apply(client);
        logger.info(`MIGRATION: migration "${migration.name}" was applied`);
        return rememberThatMigrationWasApplied(client, migration.name);
    }

    logger.info(`MIGRATION: migration "${migration.name}" was already applied`);
    return true;
};

const applyDbMigrations = (client, migrations) => migrations.reduce(
    (res, migration) => res.then(() => applyDbMigration(client, migration)),
    Promise.resolve(),
);

const applyMigrations = async () => {
    logger.info('MIGRATION: Started applying migrations...');

    try {
        await dbClient.connect();

        await createMigrationTable(dbClient);
        await applyDbMigrations(dbClient, migrationsList);

        await dbClient.disconnect();
        logger.info('MIGRATION: Migrations were successfully applied');
    } catch (err) {
        logger.error('MIGRATION: Error applying migrations: ', err);
    }
};

module.exports = {
    applyMigrations,
};
