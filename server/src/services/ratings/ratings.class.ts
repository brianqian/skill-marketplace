import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export class Ratings extends Service {
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'ratings'
    });
  }
}
