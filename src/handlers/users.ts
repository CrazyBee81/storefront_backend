import express, {Request, Response} from "express";
import {User, UserStore} from "../modules/user";
import jwt, {Secret} from 'jsonwebtoken';

const store = new UserStore;

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        let user: User = {
            firstname: req.body.firstname,
            lastname:  req.body.lastname,
            mail: req.body.mail,
            password:  req.body.password,
            address: req.body.address,
            city: req.body.city,
            zipCode: req.body.zipCode,
            state: req.body.state,
            creditcard: req.body.creditcard,
        }

        user = await store.create(user);

        const token: string = jwt.sign(user, process.env.TOKEN_SECRET as Secret)

        res.json(token);
    } catch (err) {
        res.json(`couldn´t create user. Error: ${err}`);
    }
}

const index = async (req: Request, res: Response): Promise<void> => {
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
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(500);
    }
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            firstname: "",
            lastname: "",
            password: req.body.password,
            mail: req.body.mail,
            address: "",
            city: "",
            zipCode: 0,
            state: "",
            creditcard: 0,
        }

        const u = await store.authenticate(user)

        // @ts-ignore
        var token = jwt.sign({ User: u }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch (e) {
        res.status(401)
        res.json(`Access denied, invalid token. Error: ${e}`)
        return
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
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
        const user: User = await store.show(req.params.user_id);
        res.json(user);
    } catch (err) {
        res.json(`could not find user ${req.body.id}. Error: ${err}`);
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/user/:user_id', show);
    app.post('/user/auth', authenticate);
    app.post('/users', create);
}

export default userRoutes