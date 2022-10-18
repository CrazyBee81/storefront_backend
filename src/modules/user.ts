
import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    firstname: string,
    lastname: string,
    password: string,
    mail: string,
    address: string,
    city: string,
    zipCode: number,
    state: string,
    creditcard: number
}

export type SignIn = {
    firstname: string,
    lastname: string,
    password: string
}

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname,lastname,password, mail, address,city, zip, state, card) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'

            // hashing password
            const pepper: string = process.env.BCRYPT_PASSWORD as string
            const saltRounds: string = process.env.SALT_ROUNDS as string

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );
            console.log(hash)
            const result = await conn.query(sql, [u.firstname, u.lastname, hash, u.mail, u.address, u.city, u.zipCode, u.state, u.creditcard]);

            const user: User = result.rows[0]

            conn.release()

            return user

        } catch (err) {
            throw new Error(`could not create user ${u.firstname} ${u.lastname}. Error: ${err}`);
        }
    }
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql);
            const users = result.rows

            conn.release()
            return users
        } catch (err) {
            throw Error('could not get users')
        }
    }
    async authenticate(s: SignIn): Promise<User> {
        try {
            // hashing password
            const pepper: string = process.env.BCRYPT_PASSWORD as string
            const saltRounds: string = process.env.SALT_ROUNDS as string

            const hash = bcrypt.hashSync(
                s.password + pepper,
                parseInt(saltRounds)
            );

            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE firstname = ($1) AND lastname = ($2) AND password = ($3)'

            const result = await conn.query(sql, [s.firstname, s.lastname, hash]);
            const user: User = result.rows[0]

            conn.release()

            return user

        } catch (err) {
            throw new Error(`could not get user ${s.firstname} ${s.lastname}. Error: ${err}`);
        }

    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT *
                         FROM users
                         WHERE id = ($1)`
            const result = await conn.query(sql, [id]);
            const user: User = result.rows[0]


            conn.release()
            return user
        } catch (err) {
            throw Error(`could not get user with id ${id}. Error: ${err}`)
        }
    }
}