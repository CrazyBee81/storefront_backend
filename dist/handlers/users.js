"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../modules/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore;
const create = async (req, res) => {
    try {
        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            state: req.body.state,
            creditcard: req.body.creditcard,
        };
        user = await store.create(user);
        const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.json(`couldn´t create user. Error: ${err}`);
    }
};
const index = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(500);
    }
};
const authenticate = async (req, res) => {
    try {
        const user = {
            firstname: "",
            lastname: "",
            password: req.body.password,
            mail: req.body.mail,
            address: "",
            city: "",
            zipCode: 0,
            state: "",
            creditcard: 0,
        };
        const u = await store.authenticate(user);
        // @ts-ignore
        var token = jsonwebtoken_1.default.sign({ User: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (e) {
        res.status(401);
        res.json(`Access denied, invalid token. Error: ${e}`);
        return;
    }
};
const show = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const user = await store.show(req.params.user_id);
        res.json(user);
    }
    catch (err) {
        res.json(`could not find user ${req.body.id}. Error: ${err}`);
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/user/:user_id', show);
    app.post('/user/auth', authenticate);
    app.post('/users', create);
};
exports.default = userRoutes;
