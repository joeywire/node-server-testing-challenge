
exports.up = function(knex) {
  return knex.schema.createTable('courses', tbl => {
    tbl.increments();
    tbl.string('name', 256).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('courses');
};
