"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_methods_class_1 = require("./contact_methods.class");
const contact_methods_hooks_1 = __importDefault(require("./contact_methods.hooks"));
function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/contact/methods', new contact_methods_class_1.ContactMethods(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('contact/methods');
    service.hooks(contact_methods_hooks_1.default);
}
exports.default = default_1;
