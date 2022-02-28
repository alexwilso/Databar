// This file imports our create database file. It drops the database if it already exist, create the required
// tables, and fill them with sample data.
const host = 'classmysql.engr.oregonstate.edu';
const user = '';
const password = '';
const database = '';

const Importer = require('mysql-import');
const importer = new Importer({host, user, password, database});

importer.onProgress(progress=>{
  let percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
  console.log(`${percent}% Completed`);
});

importer.import('sql/createDatabase.sql').then(()=>{
  let files_imported = importer.getImported();
  console.log(`${files_imported.length} SQL file(s) imported.`);
}).catch(err=>{
  console.error(err);
});
