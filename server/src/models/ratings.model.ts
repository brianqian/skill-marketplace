// ratings-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'ratings';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        console.log("ratings");
        table.increments('id').primary();
        table.integer('course_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('course_id').references('id').inTable('courses');
        table.foreign('user_id').references('id').inTable('users');
        table.integer('rating').unsigned().notNullable();
        table.string('comment', 512);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  return db;
}
