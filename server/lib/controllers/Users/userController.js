"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptService_1 = __importDefault(require("../../services/bcryptService"));
const jwtService_1 = __importDefault(require("../../services/jwtService"));
const connection_1 = __importDefault(require("../../db/connection"));
exports.createUser = async (req, res, next) => {
    console.log('Creating User...');
    const { email, password, firstName, lastName } = req.body;
    const hashedPass = await bcryptService_1.default.hashPass(password);
    const query = [email, hashedPass, firstName, lastName];
    try {
        connection_1.default.query('INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING id', query, async (err, result) => {
            if (err)
                return next(err);
            console.log('result', result);
            const { id } = result.rows[0];
            const token = await jwtService_1.default.signToken(id);
            res.status(201).json(token);
        });
    }
    catch (err) {
        return next(err);
    }
};
