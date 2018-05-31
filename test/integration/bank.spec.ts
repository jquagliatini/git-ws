/* tslint-env jest */
import * as restify from 'restify';
import * as request from 'supertest';
import createServer from '../../src/createServer';

const server = createServer(restify.createServer());

describe('[integration]', () => {
  describe('PUT /add', () => {
    it('should add an amount', (done) => {
      request(server)
        .put('/add')
        .send({ amount: 100 })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toHaveProperty('balance', {
            amount: 100 * 100,
            currency: 'EUR',
          });
          done();
        });
    });
  });

  describe('PUT /sub', () => {
    it('should sub an amount', (done) => {
      request(server)
        .put('/sub')
        .send({ amount: 100 })
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

  describe('GET /balance', () => {
    it('should return 0', (done) => {
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

  describe('GET /h', () => {
    it('should return the tx history', (done) => {
      request(server)
        .get('/h')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.length).toBe(2);
          expect(res.body[0]).toMatchObject({
            id: 0,
            _href: '/t/0',
            a: {
              _: 100,
              c: 'EUR',
              s: '1.00EUR',
            },
          });
          expect(res.body[0].d).toBeLessThanOrEqual(Date.now());
          return done();
        });
    });
  });

  describe('GET /t/:txid', () => {
    it('should return a specific tx', (done) => {
      request(server)
        .get('/t/0')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.id).toBe(0);
          expect(res.body.a).toEqual({
            _: 100,
            c: 'EUR',
            s: '1.00EUR',
          });
          return done();
        });
    });
  });
});
