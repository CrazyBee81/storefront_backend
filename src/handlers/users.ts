import {Request, Response} from "express";
import {UserStore} from "../modules/user";
import jwt from 'jsonwebtoken';

const store = new UserStore;

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const auth: String = req.headers.authorization as string;
        const token: String = auth?.split(' ')[1];
        // @ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (e) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try {
        const users = await store.index;
        res.json(users);
    } catch (err) {
        res.status(500);
    }
}