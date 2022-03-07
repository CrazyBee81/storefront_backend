"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../modules/order");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.json(`could not get orders. Error: ${err}`);
    }
};
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const order = {
            status: req.body.status,
            user_id: req.params.userID
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProducts = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        // @ts-ignore
        const quantity = parseInt(req.body.quantity);
        const order_id = req.params.id;
        const product_id = req.body.product_id;
        const newCartEntry = await store.addProducts(quantity, order_id, product_id);
        res.json(newCartEntry);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(400);
        res.json({ error });
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.post('/user/:userID/orders', create);
    app.post('/order/:id/products', addProducts);
    app.delete('/orders', destroy);
};
exports.default = orderRoutes;
