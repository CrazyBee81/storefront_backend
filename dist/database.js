"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
let Client;
if (process.env.ENV === 'dev') {
    Client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        //@ts-ignore
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    });
}
if (process.env.ENV === 'test') {
    Client = new pg_1.Pool({
        host: process.env.POSTGRES_HOST,
        //@ts-ignore
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    });
}
exports.default = Client;
