import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()


let Client: Pool;

if (process.env.ENV === 'dev') {
    Client = new Pool({
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT as string),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    })
}

if (process.env.ENV === 'test') {
    Client = new Pool({
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT as string),
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    })
}

// @ts-ignore
export default Client