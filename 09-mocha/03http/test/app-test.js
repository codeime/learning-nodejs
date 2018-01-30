const request = require('supertest');
const app = require('../app.js');
describe("#test koa app", () => {

    let server = app.listen(9999);
    describe('#test server', () => {
        it('#test Get /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>hello world</h1>');
        });

        it('#test Get /path?name=guobing', async () => {

            let res = await request(server)
                .get('/path?name=guobing')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>hello guobing</h1>');
        });

    });
});