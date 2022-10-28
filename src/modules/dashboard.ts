import Client from "../database";
import {Order} from "./order"

export class DashboardStore {
    async showCurrent(user_id:string): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC';
        const result = await conn.query(sql, [user_id]);
        const order:Order = result.rows[0]
        console.log(result.rows[1])
        conn.release()

        return order
    }
    async showCompleted(user_id:string): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
        const result = await conn.query(sql, [user_id, 'closed']);
        const orders = result.rows

        conn.release()

        return orders
    }
    async fiveMostPopular(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT SUM (quantity), product_id FROM orders_products INNER JOIN products ON orders_products.product_id = products.id GROUP BY product_id ORDER BY SUM (quantity) DESC LIMIT 5 ';
        const result = await conn.query(sql);
        const orders = result.rows

        conn.release()

        return orders
    }
    async productsByCategory(category:string): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT category, name, price FROM products WHERE category=($1)';
        const result = await conn.query(sql, [category]);
        const orders = result.rows

        conn.release()

        return orders
    }
}