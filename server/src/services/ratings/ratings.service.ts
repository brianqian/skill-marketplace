// Initializes the `ratings` service on path `/ratings`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Ratings } from './ratings.class';
import hooks from './ratings.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'ratings': Ratings & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: app.get('knexClient'),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ratings', new Ratings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ratings');

  service.hooks(hooks);
}
