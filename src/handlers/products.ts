import express, {Request, Response} from "express";
import jwt, {Secret} from 'jsonwebtoken';
import {Product, ProductStore} from "../modules/product";

const store = new ProductStore();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index()
        res.json(products);
    } catch (err) {
        res.status(500);
        res.json(`can not get list of products`);
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body.product_id)
        const product: Product = await store.show(req.body.product_id);
        res.json(product);
    } catch (err) {
        res.json(`could not find product with id ${req.body.id}. Error: ${err}`);
    }
}
const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const auth: string = req.headers.authorization as string;
        const token: string = auth?.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    } catch (e) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const product: Product = {
            name: req.body.product_name,
            price:  req.body.price,
            category: req.body.category,
            description: req.body.description,
            url: req.body.url
        }

        const newProduct: Product = await store.create(product);

        res.json(newProduct);
    } catch (err) {
        res.json(`couldn´t create product. Error: ${err}`);
    }
}

const productsRoutes = async (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:product_id', show);
    app.post('/products/', create);
}

export default productsRoutes