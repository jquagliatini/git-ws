/* tslint-env jest */
import * as restify from 'restify';
import * as request from 'supertest';
import createServer from '../../src/createServer';

const server = createServer(restify.createServer());

describe('[integration] GET /balance', () => {
  it('should return 0 at first', (done) => {
    request(server)
      .get('/balance')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('balance', {
          amount: 0,
          currency: 'EUR',
        });
        done();
      });
  });
});
