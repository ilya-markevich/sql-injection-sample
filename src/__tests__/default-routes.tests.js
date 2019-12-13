const got = require('got');
const hooks = require('./helpers/hooks');

describe('Default routes', () => {
    let server;
    let db;
    let url;

    beforeAll(async () => {
        const info = await hooks.before();

        server = info.server;
        db = info.db;
        url = info.url;
    });

    describe('[GET] /', () => {
        it('should return html page', async () => {
            const response = await got(url);

            expect(response.headers['content-type']).toEqual('text/html; charset=utf-8');
            expect(response.body.includes('<body>')).toEqual(true);
        });
    });

    afterAll(() => hooks.after(server, db));
});
