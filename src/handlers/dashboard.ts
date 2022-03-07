import express, {Request, Response} from 'express'
import jwt, {Secret} from "jsonwebtoken";
import {DashboardStore} from "../modules/dashboard";

const store = new DashboardStore()

const ordersByUser = async (_req: Request, res: Response): Promise<void> => {
    try{
        const orders = await store.ordersByUser()
        res.json(orders)
    } catch (err) {
        res.json(`could not get orders. Error: ${err}`);
    }
}

const showCurrent = async (req: Request, res: Response): Promise<void> => {
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
        const orders = await store.showCurrent(req.params.userID);
        res.json(orders);
    } catch (err) {
        res.json(`could not get order from user with ${req.params.userID}. Error: ${err}`);
    }
}
const showCompleted = async (req: Request, res: Response): Promise<void> => {
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
        const orders = await store.showCompleted(req.params.userID);
        res.json(orders);
    } catch (err) {
        res.json(`could not get completed orders from user with ${req.params.userID}. Error: ${err}`);
    }
}
const fiveMostPopular = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.fiveMostPopular();
        res.json(orders);
    } catch (err) {
        res.json(`could not get five most popular products. Error: ${err}`);
    }
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/user/:userID/orders', showCurrent)
    app.get('/user/:userID/orders_completed', showCompleted)
    app.get('/dashboard/five_most_popular', fiveMostPopular)
}

export default dashboardRoutes