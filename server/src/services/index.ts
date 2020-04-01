import { Application } from '../declarations';
import users from './users/users.service';
import courses from './courses/courses.service';
import ratings from './ratings/ratings.service';
import categories from './categories/categories.service';
import contactInfo from './contact_info/contact_info.service';
import contactMethods from './contact_methods/contact_methods.service';
import userCourses from './user_courses/user_courses.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(courses);
  app.configure(ratings);
  app.configure(categories);
  app.configure(contactInfo);
  app.configure(contactMethods);
  app.configure(userCourses);
}
