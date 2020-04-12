"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("./users/users.service"));
const categories_service_1 = __importDefault(require("./categories/categories.service"));
const contact_methods_service_1 = __importDefault(require("./contact_methods/contact_methods.service"));
const courses_service_1 = __importDefault(require("./courses/courses.service"));
const ratings_service_1 = __importDefault(require("./ratings/ratings.service"));
const contact_info_service_1 = __importDefault(require("./contact_info/contact_info.service"));
const user_courses_service_1 = __importDefault(require("./user_courses/user_courses.service"));
// Don't remove this comment. It's needed to format import lines nicely.
function default_1(app) {
    app.configure(users_service_1.default);
    app.configure(categories_service_1.default);
    app.configure(contact_methods_service_1.default);
    app.configure(courses_service_1.default);
    app.configure(ratings_service_1.default);
    app.configure(contact_info_service_1.default);
    app.configure(user_courses_service_1.default);
}
exports.default = default_1;
