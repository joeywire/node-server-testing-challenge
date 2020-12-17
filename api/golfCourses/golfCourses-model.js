const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  addCourse
};

function getAll() {
  return db('courses');
}

async function addCourse(course) {
  const [id] = await db('courses').insert(course); 
  return db('courses').where({id}).first();
}