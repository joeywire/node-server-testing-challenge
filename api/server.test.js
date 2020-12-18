const request = require('supertest')
const server = require('./server') // a router
const db = require('../data/dbConfig'); 

const MQ = { name: "Marquette" }; 
const AG = { name: "Augusta" }; 
const BP = { name: "Beth Page" }; 

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('courses').truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe('endpoints', () => {
  describe('[GET] endpoint', () => {
    it('Responds with 200', async () => {
      const res = await request(server).get('/api/courses'); 
      expect(res.status).toBe(200);
    }); 
    it('Returns empty array if no courses in DB', async () => {
      const res = await request(server).get('/api/courses'); 
      expect(res.body).toHaveLength(0); 
    }); 
    it('returns all hobits if present in DB', async () => {
      await db('courses').insert(MQ); 
      const res = await request(server).get('/api/courses'); 
      expect(res.body).toHaveLength(1); 
      expect(res.body[0]).toMatchObject(MQ);
    });
  });
});