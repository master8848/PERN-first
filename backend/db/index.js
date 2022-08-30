const { Pool } = require("pg");

const credentials = {
  user: "master",
  host: "localhost",
  database: "yelp",
  password: "9803289209",
  port: 5432,
};

// Connect with a connection pool.
const pool = new Pool(credentials);
module.exports = pool;
