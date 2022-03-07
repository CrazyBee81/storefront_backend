"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../modules/product");
const store = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(500);
        res.json(`can not get list of products`);
    }
};
const show = async (req, res) => {
    try {
        console.log(req.body.product_id);
        const product = await store.show(req.body.product_id);
        res.json(product);
    }
    catch (err) {
        res.json(`could not find product with id ${req.body.id}. Error: ${err}`);
    }
};
const create = async (req, res) => {
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
        const product = {
            product_name: req.body.product_name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.json(`couldn´t create product. Error: ${err}`);
    }
};
const productsRoutes = async (app) => {
    app.get('/products', index);
    app.get('/product/:product_id', show);
    app.post('/products/', create);
};
exports.default = productsRoutes;
