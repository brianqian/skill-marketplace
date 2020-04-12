"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
function default_1(app) {
    const client = app.get("db_client");
    const connection = app.get("db_connection");
    const db = knex_1.default({ client, connection });
    console.log(connection);
    app.set("knexClient", db);
}
exports.default = default_1;
