
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('artists', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
      table.string('image');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('albums', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
      table.string('image');
      table.integer('artist_id').unsigned();
      table.foreign('artist_id').references('artists.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('albums'),
    knex.schema.dropTable('artists')
  ]);
};
