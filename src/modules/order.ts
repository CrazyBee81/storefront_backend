import Client from "../database";

export type Order = {
    user_id: string,
    status: string,
    total: number,
    shipping: number
}

export class OrderStore {
    async create(o:Order): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'INSERT INTO orders (status, user_id, total, shipping) VALUES ($1,$2,$3,$4) RETURNING *'
        const result = await conn.query(sql, [o.status, o.user_id, o.total, o.shipping]);
        const newOrder = result.rows[0]

        conn.release()

        return newOrder
    }
    async index(): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql);

        conn.release()

        return result.rows
    }
    async delete(order_id:string): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'DELETE * FROM orders WHERE id=$(1)';
        const result = await conn.query(sql, [order_id]);
        const order:Order = result.rows[0]

        conn.release()

        return order
    }
    async addProducts(quantity: number, order_id: string, product_id: string): Promise<Order> {
        const conn = await Client.connect();
        const sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *'
        const result = await conn.query(sql, [quantity, order_id, product_id]);
        const newOrder = result.rows[0]

        conn.release()

        return newOrder
    }
    async getProducts(order_id:string): Promise<Order[]> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders_products INNER JOIN orders ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE orders.id=($1)';
        const result = await conn.query(sql, [order_id]);

        conn.release()

        return result.rows

    }
}