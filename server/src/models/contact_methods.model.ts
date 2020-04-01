// contact_methods-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'contact_methods';
  let isDone:boolean = true;
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("contact_methods");
        table.string('name').primary();
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
