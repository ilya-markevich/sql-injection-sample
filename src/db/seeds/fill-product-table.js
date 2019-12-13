const data = [
    {
        name: 'Smart Watch',
        count: 5,
    },
    {
        name: 'Tablet',
        count: 8,
    },
    {
        name: 'Mobile phone',
        count: 2,
    },
    {
        name: 'Notebook',
        count: 15,
    },
    {
        name: 'PC',
        count: 9,
    },
    {
        name: 'Keyboard',
        count: 11,
    },
    {
        name: 'Mouse',
        count: 5,
    },
    {
        name: "Men''s shoes",
        count: 8,
    },
];

const apply = (dbClient) => dbClient.execQueryRaw(
    data
        .map(({ name, count }) => `INSERT INTO product(name, count) VALUES('${name}', ${count});`)
        .join('\n'),
);

module.exports = {
    name: 'Fill product table',
    apply,
};
