"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const { JWT_SECRET } = process.env;
if (!JWT_SECRET)
    throw http_errors_1.default(500, 'Error with Env variables');
const signToken = async (userId) => {
    const token = await jsonwebtoken_1.default.sign(userId, JWT_SECRET);
    return token;
};
const verifyToken = async (token) => {
    try {
        const verified = await jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return verified;
    }
    catch (err) {
        throw http_errors_1.default(500, 'Error with jsonwebtoken');
    }
};
const jwtService = {
    signToken,
    verifyToken,
};
exports.default = jwtService;
