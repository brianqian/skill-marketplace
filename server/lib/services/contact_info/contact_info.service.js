"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_info_class_1 = require("./contact_info.class");
const contact_info_hooks_1 = __importDefault(require("./contact_info.hooks"));
async function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/contact/info', new contact_info_class_1.ContactInfo(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('contact/info');
    service.hooks(contact_info_hooks_1.default);
}
exports.default = default_1;
