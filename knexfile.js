// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/top_artists',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefualt: true
  }

};
