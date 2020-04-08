const mysql = require('mysql');

// a bit slower, but more secure. Allow 5 connections at any given time. Feel free to uncomment and retrieve the mysql.createConnection in the next lines for quicker reactions
module.exports = db = mysql.createPool({
  connectionLimit: 5,
  host: 'remotemysql.com',
  user: 'QHumDJGXfj',
  password: 'NQMKK0TM1U',
  database: 'QHumDJGXfj',
});

// a bit faster, but less secure
// module.exports = db = mysql.createConnection({
//   host: 'remotemysql.com',
//   user: 'QHumDJGXfj',
//   password: 'NQMKK0TM1U',
//   database: 'QHumDJGXfj'
// });
// // createdb();
// db.connect(err => {
//   if (err) {
//     console.log('problem with connecting to db', err);
//   } else {
//     console.log(`connected successfully to db`);
//   }
// });

const createdb = () => {
  console.log('creating db');
  let sql = `CREATE DATABASE`;
  sql.db.query(sql, (err, result) => {
    err
      ? console.log('error while trying to create db', err)
      : console.log(`db created successfully`, result);
  });
};

const createTable = (table) => {
  console.log('creating table');
  let sql = `CREATE TABLE ${table}(id int AUTO_INCREMENT, vast_url varchar(600) NOT NULL, position varchar(30) DEFAULT 'bottom_right', width int DEFAULT 100, height int DEFAULT 100, PRIMARY KEY(id))`;
  db.query(sql, (err, result) => {
    err ? console.log(err) : console.log('table creation succeeded');
  });
};

const drop = (table) => {
  console.log('dropping table');
  let sql = `drop table ${table}`;
  db.query(sql, (err, result) => {
    err
      ? console.log('dropping table issue')
      : console.log('droping table succeeded');
  });
};

const clearTable = (table) => {
  console.log('clearing table');
  let sql = `DELETE from ${table}`;
  db.query(sql, (err, result) => {
    err
      ? console.log('clearing table issue')
      : console.log('clearing table succeeded');
  });
};
// creates table named Vasts
createTable('Vasts');

// drop table named Vasts
// drop('Vasts');

// delete all from table named Vasts
// clearTable('Vasts');
