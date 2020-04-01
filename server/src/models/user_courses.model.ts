// user_courses-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'user_courses';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("user_courses");
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('course_id', 'courses.id');
        table.foreign('user_id', 'users.id');
        table.dateTime('date').notNullable();
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
}
