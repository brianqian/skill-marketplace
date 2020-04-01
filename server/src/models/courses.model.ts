// courses-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'courses';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("courses");
        table.increments('id').primary();
        table.string('name', 64).notNullable();
        table.string('description', 1024).notNullable();
        table.integer('instructor_id').unsigned().notNullable();
        table.string('category').unsigned().notNullable();
        table.foreign('instructor_id').references('id').inTable('users');
        table.foreign('category').references('name').inTable('categories');
        table.float('rate', 6, 2);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
}
