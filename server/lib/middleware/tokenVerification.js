"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = __importDefault(require("../services/jwtService"));
const verifyToken = async (req, res, next) => {
    const { headers } = req;
    if (!(headers === null || headers === void 0 ? void 0 : headers.authorization))
        return res.status(401).json(false);
    const { authorization } = headers;
    const token = authorization.slice(authorization.indexOf(' ') + 1);
    const decryptedToken = await jwtService_1.default.verifyToken(token);
    if (decryptedToken) {
        res.locals.userId = decryptedToken;
    }
    return next();
};
exports.default = verifyToken;
