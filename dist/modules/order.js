"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async create(o) {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO orders (status, user_id, total, shipping) VALUES ($1,$2,$3,$4) RETURNING *';
        const result = await conn.query(sql, [o.status, o.user_id, o.total, o.shipping]);
        const newOrder = result.rows[0];
        conn.release();
        return newOrder;
    }
    async index() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async delete(order_id) {
        const conn = await database_1.default.connect();
        const sql = 'DELETE * FROM orders WHERE id=$(1)';
        const result = await conn.query(sql, [order_id]);
        const order = result.rows[0];
        conn.release();
        return order;
    }
    async addProducts(quantity, order_id, product_id) {
        const conn = await database_1.default.connect();
        const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
        const result = await conn.query(sql, [quantity, order_id, product_id]);
        const newOrder = result.rows[0];
        conn.release();
        return newOrder;
    }
    async getProducts(order_id) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE orders.id=($1)';
        const result = await conn.query(sql, [order_id]);
        conn.release();
        return result.rows;
    }
}
exports.OrderStore = OrderStore;
