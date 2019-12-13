const got = require('got');
const hooks = require('./helpers/hooks');

describe('Product routes', () => {
    let server;
    let db;
    let url;

    beforeAll(async () => {
        const info = await hooks.before();

        server = info.server;
        db = info.db;
        url = info.url;
    });

    describe('[GET] /unsafeSearch', () => {
        it('should return products list', async () => {
            const response = await got(`${url}/unsafeSearch?search=a`, { json: true });

            expect(response.body.length)
                .toBeGreaterThan(0);
        });

        it('should throw error on sql injection', async () => {
            await expect(got(`${url}/unsafeSearch?search=n'`, { json: true }))
                .rejects
                .toThrow(/Bad Request/);
        });
    });

    describe('[GET] /searchWithoutError', () => {
        it('should return products list', async () => {
            const response = await got(`${url}/searchWithoutError?search=a`, { json: true });

            expect(response.body.length)
                .toBeGreaterThan(0);
        });

        it('should not throw error on sql injection', async () => {
            const response = await got(`${url}/searchWithoutError?search=n'`, { json: true });

            expect(response.body).toHaveLength(0);
        });
    });

    describe('[GET] /safeSearch', () => {
        it('should return products list', async () => {
            const response = await got(`${url}/safeSearch?search=a`, { json: true });

            expect(response.body.length)
                .toBeGreaterThan(0);
        });

        it('should not throw error and return result', async () => {
            const response = await got(`${url}/safeSearch?search=n'`, { json: true });

            expect(response.body).toHaveLength(1);
        });
    });

    afterAll(() => hooks.after(server, db));
});
