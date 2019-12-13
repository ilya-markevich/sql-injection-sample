const apply = (dbClient) => dbClient.execQueryRaw(`
CREATE TABLE IF NOT EXISTS "user" (
   id serial PRIMARY KEY,
   email VARCHAR (100) UNIQUE NOT NULL,
   password VARCHAR (100) NOT NULL,
   created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = {
    name: 'Create user table',
    apply,
};
