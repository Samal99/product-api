const mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
  host: (process.env.awsHost), // e.g., database-1.abcdefghij.us-east-1.rds.amazonaws.com
  port: (process.env.awsPort),                     // default MySQL port is 3306
  user: (process.env.awsUser),          // e.g., admin
  password: (process.env.awsPass)    // your database password
  // database: 'your-database-name'  // the name of your database
});



connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database");
});

module.exports = connection;
