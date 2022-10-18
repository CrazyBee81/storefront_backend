import Client from '../database';

export type Product = {
    name: string,
    price: string,
    category: string
    description: string
    url: string
}

export class ProductStore {
    async create (p: Product):Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category, description, url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category, p.description,p.url]);
            const product:Product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`could not create product ${p.name}. Error: ${err}`)
        }
    }
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
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [product_id]);
            const product = result.rows[0]

            conn.release()

            return product
        } catch (err) {
            throw new Error(`could not get product with id ${product_id}. Error: ${err}`)
        }
    }

}





