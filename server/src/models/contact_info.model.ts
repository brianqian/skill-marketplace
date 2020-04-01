// contact_info-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application) {
  const db: Knex = app.get('knexClient');
  const tableName = 'contact_info';
  db.schema.hasTable(tableName).then(async exists => {
    if(!exists) {
      await db.schema.createTable(tableName, table => {
        console.log("contact_info");
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('contact_method').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('contact_method').references('name').inTable('contact_methods');
        table.string('contact_info', 256);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
}
