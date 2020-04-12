"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.hashPass = async (password) => {
    const SALT_ROUNDS = 10;
    const hashedPass = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    return hashedPass;
};
exports.validatePass = async (userPass, dbHash) => {
    const isValid = await bcrypt_1.default.compare(userPass, dbHash);
    return isValid;
};
const bcryptService = {
    hashPass: exports.hashPass,
    validatePass: exports.validatePass,
};
exports.default = bcryptService;
