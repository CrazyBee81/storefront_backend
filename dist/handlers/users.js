"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../modules/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore;
const index = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const users = await store.index;
        res.json(users);
    }
    catch (err) {
        res.status(500);
    }
};
