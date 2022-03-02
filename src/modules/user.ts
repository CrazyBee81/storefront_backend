import client from '../database';

export type User = {
    id: Number,
    firstName: String,
    lastName: String,
    password: String
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = client.connect();
            const sql = 'SELECT * FROM users'
            const result = conn.query(sql);
            const users = result.rows
            conn.release();
            return users
        } catch (err) {
            throw Error('could not get users')
        }
    }


}