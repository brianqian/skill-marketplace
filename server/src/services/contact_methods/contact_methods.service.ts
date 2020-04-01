// Initializes the `contact_methods` service on path `/contact/methods`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ContactMethods } from './contact_methods.class';
import createModel from '../../models/contact_methods.model';
import hooks from './contact_methods.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'contact/methods': ContactMethods & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/contact/methods', new ContactMethods(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contact/methods');

  service.hooks(hooks);
}
