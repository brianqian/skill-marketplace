// Front End Routes
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const PROFILE_ROUTE = 'profile';
export const HOME_ROUTE = '/home';
export const CLASSES_ROUTE = '/classes';
export const EDIT_CLASSES_ROUTE = PROFILE_ROUTE + CLASSES_ROUTE;
export const EDIT_PROFILE_ROUTE = PROFILE_ROUTE + HOME_ROUTE;


// Back End Routes
export const USERS_ROUTE = '/users';
export const COURSES_ROUTE = '/courses';
export const CATEGORIES_ROUTE = '/categories';
export const CONTACT_METHOD_ROUTE = '/contact/method';
export const CONTACT_INFO_ROUTE = '/contact/info';
export const AUTHENTICATION_ROUTE = '/authentication';
export const USER_COURSES_ROUTE = USERS_ROUTE + COURSES_ROUTE;
export const RATINGS_ROUTE = '/ratings';
