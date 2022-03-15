// This file imports our create database file. It drops the tables if they already exist, creates the required
// tables, and fill them with sample data.
// Refrenced: mysql-import documentation

const host = 'classmysql.engr.oregonstate.edu';
const user = 'cs340_wilsoal9';
const password = '0662';
const database = 'cs340_wilsoal9';

const Importer = require('mysql-import');
const importer = new Importer({host, user, password, database});

// Percent import complete
importer.onProgress(progress=>{
  let percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
  console.log(`${percent}% Completed`);
});

// File imported or rejected
importer.import('sql/createDatabase.sql').then(()=>{
  let files_imported = importer.getImported();
  console.log(`${files_imported.length} SQL file(s) imported.`);
}).catch(err=>{
  console.error(err);
});
