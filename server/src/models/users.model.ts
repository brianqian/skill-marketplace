// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import { Application } from '../declarations';
import Knex from 'knex';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'users';
  let isDone:boolean = false;
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("users");
        table.increments('id').primary();
        table.string('email', 256).unique();
        table.string('password', 64).notNullable();
        table.string('first_name', 32).notNullable();
        table.string('last_name', 32).notNullable();
        table.string('description', 1024).nullable();
        table.boolean('is_instructor').defaultTo(false);



        //table.string('auth0Id');

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
