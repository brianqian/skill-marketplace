"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_knex_1 = require("feathers-knex");
class Ratings extends feathers_knex_1.Service {
    constructor(options, app) {
        super({
            ...options,
            name: 'ratings'
        });
    }
}
exports.Ratings = Ratings;
