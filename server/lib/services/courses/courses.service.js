"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_class_1 = require("./courses.class");
const courses_hooks_1 = __importDefault(require("./courses.hooks"));
function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/courses', new courses_class_1.Courses(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('courses');
    service.hooks(courses_hooks_1.default);
}
exports.default = default_1;
