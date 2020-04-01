import { Application } from '../declarations';
import users from './users/users.service';
import categories from './categories/categories.service';
import contactMethods from './contact_methods/contact_methods.service';
import courses from './courses/courses.service';
import ratings from './ratings/ratings.service';
import contactInfo from './contact_info/contact_info.service';
import userCourses from './user_courses/user_courses.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  console.log('about to configure users');
  app.configure(users);
  console.log('about to configure categories');
  app.configure(categories);
  console.log('about to configure contactmethods');
  app.configure(contactMethods);
  console.log('about to configure courses');
  app.configure(courses);
  console.log('about to configure ratings');
  app.configure(ratings);
  app.configure(contactInfo);
  app.configure(userCourses);
}
