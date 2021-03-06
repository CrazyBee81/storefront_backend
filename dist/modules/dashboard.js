"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStore = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardStore {
    async ordersByUser() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT firstname, lastname, users.id as user_id,  orders.id as order_id FROM users INNER JOIN orders on orders.user_id = users.id ORDER BY users.id;';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async showCurrent(user_id) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC';
        const result = await conn.query(sql, [user_id]);
        const order = result.rows[0];
        console.log(result.rows);
        conn.release();
        return order;
    }
    async showCompleted(user_id) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
        const result = await conn.query(sql, [user_id, 'closed']);
        const orders = result.rows;
        conn.release();
        return orders;
    }
    async fiveMostPopular() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT product_id, quantity, products.name FROM orders_products INNER JOIN products ON orders_products.product_id = products.id GROUP BY product_id, products.name, quantity ORDER BY quantity DESC LIMIT 5 ';
        const result = await conn.query(sql);
        const orders = result.rows;
        conn.release();
        return orders;
    }
    async productsByCategory(category) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT category, name, price FROM products WHERE category=($1)';
        const result = await conn.query(sql, [category]);
        const orders = result.rows;
        conn.release();
        return orders;
    }
}
exports.DashboardStore = DashboardStore;
