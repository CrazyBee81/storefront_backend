import express, {Request, Response} from 'express'
import jwt, {Secret} from "jsonwebtoken";
import {Order,OrderStore} from "../modules/order";

const store = new OrderStore()

const index = async (_req: Request, res: Response): Promise<void> => {
    try{
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.json(`could not get orders. Error: ${err}`);
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const authorizationHeader: string = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]

        jwt.verify(token, process.env.TOKEN_SECRET as Secret)

    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const order: Order = {
            status: req.body.status as string,
            user_id: req.params.userID,
            total: req.body.total as number,
            shipping: req.body.shipping as number
        }
        console.log(order)
        const newOrder: Order = await store.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProducts = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        // @ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)

    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        // @ts-ignore

        const quantity: number = parseInt(req.body.quantity) as number;
        const order_id: string = req.params.id;
        const product_id: string = req.body.product_id;

        const newCartEntry = await store.addProducts(quantity, order_id, product_id)

        res.json(newCartEntry);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        // @ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const orders = await store.getProducts(req.params.orderId)
        res.json(orders)
    } catch (error) {
        res.status(400)
        res.json({error})
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        // @ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json({error})
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.post('/user/:userID/orders', create)
    app.get('/order/:orderId/products', getProducts)
    app.post('/order/:id/products', addProducts)
    app.delete('/orders', destroy)
}

export default orderRoutes