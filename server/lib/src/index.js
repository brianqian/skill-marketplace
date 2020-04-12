"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV || "developemnt";
// Enable security, CORS, compression, favicon and body parsing
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(compression_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Host the public folder
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    console.log(`Running in ${isDev} mode`);
});
exports.default = app;
