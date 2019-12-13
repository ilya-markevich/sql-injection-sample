const logger = require('../helpers/logger');

module.exports = ({ db }) => {
    const findProducts = async (searchString) => {
        const query = `SELECT * from product where name LIKE '%${searchString}%'`;
        logger.info(`QUERY: ${query}`);

        const { rows } = await db.execQueryRaw(query);
        return rows;
    };

    const findProductsSafe = async (searchString) => {
        const query = `SELECT * from product where name LIKE '%${searchString}%'`;
        logger.info(`QUERY: ${query}`);

        try {
            const { rows } = await db.execQueryRaw(query);
            return rows;
        } catch (err) {
            logger.error(err);
            return [];
        }
    };

    const findProductsSafest = async (searchString) => {
        const query = "SELECT * from product where name ILIKE '%'||$1||'%'";
        logger.info(`QUERY: ${query}`);

        const { rows } = await db.execQuery(query, [searchString]);
        return rows;
    };

    return {
        findProducts,
        findProductsSafe,
        findProductsSafest,
    };
};
