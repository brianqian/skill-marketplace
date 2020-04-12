"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const courses_1 = __importDefault(require("./courses"));
const users_1 = __importDefault(require("./users"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/auth', auth_1.default);
router.use('/courses', courses_1.default);
router.use('/users', users_1.default);
exports.default = router;
