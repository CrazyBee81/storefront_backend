"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dashboard_1 = require("../modules/dashboard");
const store = new dashboard_1.DashboardStore();
const ordersByUser = async (_req, res) => {
    try {
        const orders = await store.ordersByUser();
        res.json(orders);
    }
    catch (err) {
        res.json(`could not get orders. Error: ${err}`);
    }
};
const showCurrent = async (req, res) => {
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
        const orders = await store.showCurrent(req.params.userID);
        res.json(orders);
    }
    catch (err) {
        res.json(`could not get order from user with ${req.params.userID}. Error: ${err}`);
    }
};
const showCompleted = async (req, res) => {
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
        const orders = await store.showCompleted(req.params.userID);
        res.json(orders);
    }
    catch (err) {
        res.json(`could not get completed orders from user with ${req.params.userID}. Error: ${err}`);
    }
};
const fiveMostPopular = async (_req, res) => {
    try {
        const orders = await store.fiveMostPopular();
        res.json(orders);
    }
    catch (err) {
        res.json(`could not get five most popular products. Error: ${err}`);
    }
};
const dashboardRoutes = (app) => {
    app.get('/user/:userID/orders', showCurrent);
    app.get('/user/:userID/orders_completed', showCompleted);
    app.get('/dashboard/five_most_popular', fiveMostPopular);
};
exports.default = dashboardRoutes;
