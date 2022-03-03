
import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    firstName: string,
    lastName: string,
    password: string
}

export class UserStore {
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstName,lastName,password) VALUES($1, $2, $3) RETURNING *'

            // hashing password
            const pepper: string = process.env.BCRYPT_PASSWORD as string
            const saltRounds: string = process.env.SALT_ROUNDS as string

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
            const user: User = result.rows[0]

            conn.release()

            return user

        } catch (err) {
            throw new Error(`could not create user ${u.firstName} ${u.lastName}. Error: ${err}`);
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