// categories-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'categories';
  let isDone = false;
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("categories");
        table.string('name', 128).primary();
      })
        .then(() => { console.log(`Created ${tableName} table`); isDone=true;})
        .catch(e => {console.error(`Error creating ${tableName} table`, e); isDone=true;});
    }
    else
    {
      isDone = true;
    }
  });

  while (!isDone)
  {
    //wait for table to finish being created or throw an error
  }


  return db;
}
