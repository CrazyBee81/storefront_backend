import Client from "../database";
import {Order} from "./order"

export class DashboardStore {
    async ordersByUser(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id = orders.id';
        const result = await conn.query(sql);

        conn.release()

        return result.rows

    }
    async completedOrdersByUser(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders_products.order_id = orders.id WHERE status orders.status = completed';
        const result = await conn.query(sql);

        conn.release()

        return result.rows

    }
}