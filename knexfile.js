module.exports = {

  production: {
    client: 'postgresql',
    connection: 'postgres://qcywsavdukyurg:11OCy451lnwuxf5CDE1RGbSWhY@ec2-54-204-6-113.compute-1.amazonaws.com:5432/d2jgvtmk0qg4vn'
  },
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
