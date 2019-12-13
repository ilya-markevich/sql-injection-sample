const ip = require('ip');
const config = require('../../config');
const { applyMigrations } = require('../../db/migrations');
const { applySeeds } = require('../../db/seeds');
const createApp = require('../../app');
const createClient = require('../../db/create-client');

const before = async () => {
    await applyMigrations();
    await applySeeds();

    const db = createClient(config.db);
    await db.connect();
    const app = createApp({ db });

    return new Promise((resolve) => {
        const server = app.listen(() => resolve({
            server,
            db,
            url: `http://${ip.address()}:${server.address().port}`,
        }));
    });
};

const after = async (server, db) => {
    await db.disconnect();
    return new Promise((resolve) => server.close(resolve));
};

module.exports = {
    before,
    after,
};
