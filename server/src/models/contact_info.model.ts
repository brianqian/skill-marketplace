// contact_info-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'contact_info';
  let isDone = false;
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("contact_info");
        table.increments('id').primary();
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('contact_method').references('name').inTable('contact_methods');
        table.string('contact_info', 256);
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
