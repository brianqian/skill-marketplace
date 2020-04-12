"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_class_1 = require("./categories.class");
const categories_hooks_1 = __importDefault(require("./categories.hooks"));
function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/categories', new categories_class_1.Categories(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('categories');
    service.hooks(categories_hooks_1.default);
}
exports.default = default_1;
