const { Client } = require('pg');

module.exports = (dbOpts) => {
    const client = new Client(dbOpts);

    const connect = () => client.connect();

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
