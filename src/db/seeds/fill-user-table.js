const data = [
    {
        email: 'tom@test.com',
        password: 'flkj5lrkwejfl2k34r',
    },
    {
        email: 'kate@test.com',
        password: '2l;kdjlskvjafvfav',
    },
    {
        email: 'mark@test.com',
        password: 'faskfjlkj341fsfa',
    },
    {
        email: 'alex@test.com',
        password: 'czxv;lzjxcvlkqjw',
    },
    {
        email: 'andrew@test.com',
        password: 'l213k4jrflkasjfd',
    },
    {
        email: 'ilya@test.com',
        password: 'vadsfkhdszlxkvjf',
    },
    {
        email: 'mike@test.com',
        password: 'alsdfjqewdflasd',
    },
];

const apply = (dbClient) => dbClient.execQueryRaw(
    data
        .map(({ email, password }) => `INSERT INTO "user"(email, password) VALUES('${email}', '${password}');`)
        .join('\n'),
);

module.exports = {
    name: 'Fill user table',
    apply,
};
