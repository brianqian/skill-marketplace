"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_courses_class_1 = require("./user_courses.class");
const user_courses_hooks_1 = __importDefault(require("./user_courses.hooks"));
function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/users/courses', new user_courses_class_1.UserCourses(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('users/courses');
    service.hooks(user_courses_hooks_1.default);
}
exports.default = default_1;
