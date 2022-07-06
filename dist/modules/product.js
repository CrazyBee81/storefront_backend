"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            console.log(product);
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`could not create product ${p.name}. Error: ${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            const products = result.rows;
            conn.release();
            return products;
        }
        catch (err) {
            throw new Error(`could not get products. Error: ${err}`);
        }
    }
    async show(product_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [product_id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`could not get product with id ${product_id}. Error: ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
