import Client from '../database';

export type Product = {
    product_name: string,
    price: string,
    category: string
}

export class ProductStore {
    async index ():Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            const products = result.rows

            conn.release()

            return products
        } catch (err) {
            throw new Error(`could not get products. Error: ${err}`)
        }
    }
    async show (product_id: string):Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql, [product_id]);
            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`could not get product with id ${product_id}. Error: ${err}`)
        }
    }
    async create (p: Product):Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql, [p.product_name, p.price, p.category]);
            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`could not get product ${p.product_name}. Error: ${err}`)
        }
    }
}





