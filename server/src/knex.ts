import knex from 'knex';
import { Application } from './declarations';

export default function (app: Application) {
  const client = app.get('db_client');
  const connection = app.get('db_connection');
  const db = knex({ client, connection });

  app.set('knexClient', db);
}
