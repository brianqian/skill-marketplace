// Initializes the `courses` service on path `/courses`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Courses } from './courses.class';
import createModel from '../../models/courses.model';
import hooks from './courses.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'courses': Courses & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/courses', new Courses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('courses');

  service.hooks(hooks);
}
