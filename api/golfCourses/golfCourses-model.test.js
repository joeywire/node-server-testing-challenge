const GolfCourse = require('./golfCourses-model'); 
const db = require('../../data/dbConfig');

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

describe('Golf Course Model', () => {
  it('Course.getAll returns empty array if no courses', async () => {
    const result = await GolfCourse.getAll(); 
    expect(result).toHaveLength(0);
  });
  it('GolfCourse.getAll returns courses', async () => {
    await GolfCourse.addCourse(MQ); 
    let result = await GolfCourse.getAll(); 
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toMatchObject(MQ); 
  });
});