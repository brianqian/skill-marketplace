"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ratings_class_1 = require("./ratings.class");
const ratings_hooks_1 = __importDefault(require("./ratings.hooks"));
function default_1(app) {
    const options = {
        Model: app.get('knexClient'),
        paginate: app.get('paginate')
    };
    // Initialize our service with any options it requires
    app.use('/ratings', new ratings_class_1.Ratings(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('ratings');
    service.hooks(ratings_hooks_1.default);
}
exports.default = default_1;
