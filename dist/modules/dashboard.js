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
        const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id = orders.id';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async completedOrdersByUser() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id = orders.id WHERE status orders.status = completed';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
}
exports.DashboardStore = DashboardStore;
