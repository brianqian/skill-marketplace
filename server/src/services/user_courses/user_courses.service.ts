// Initializes the `user_courses` service on path `/users/courses`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserCourses } from './user_courses.class';
import createModel from '../../models/user_courses.model';
import hooks from './user_courses.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'users/courses': UserCourses & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/courses', new UserCourses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/courses');

  service.hooks(hooks);
}
