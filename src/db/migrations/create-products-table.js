const apply = (dbClient) => dbClient.execQueryRaw(`
CREATE TABLE IF NOT EXISTS product (
   id serial PRIMARY KEY,
   name VARCHAR (100) UNIQUE NOT NULL,
   count NUMERIC NOT NULL
)`);

module.exports = {
    name: 'Create product table',
    apply,
};
