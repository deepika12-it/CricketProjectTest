const mysql = require("mysql2");
require("dotenv").config();
console.log(" ENV Check:", process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error(" DB Connection Failed:", err.message);
    return;
  }
  console.log(" MySQL Connected Successfully!");
});

module.exports = connection;
