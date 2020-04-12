"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feathers_knex_1 = require("feathers-knex");
class Courses extends feathers_knex_1.Service {
    constructor(options, app) {
        super({
            ...options,
            name: 'courses'
        });
    }
}
exports.Courses = Courses;
