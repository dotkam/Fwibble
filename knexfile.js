module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'development'
    },
    seeds: {
      directory: './db/seeds'
    },
    debug: false, // set true for verbose database operations
  },

  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'test'
    },
    debug: false, // set true for verbose database operations
  },
};
