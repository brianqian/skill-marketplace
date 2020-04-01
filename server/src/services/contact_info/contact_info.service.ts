// Initializes the `contact_info` service on path `/contact/info`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ContactInfo } from './contact_info.class';
import createModel from '../../models/contact_info.model';
import hooks from './contact_info.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'contact/info': ContactInfo & ServiceAddons<any>;
  }
}

export default async function (app: Application) {
  let model = await createModel(app);
  const options = {
    Model: model,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/contact/info', new ContactInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contact/info');

  service.hooks(hooks);
}
