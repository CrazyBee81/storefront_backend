    import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env

let Client: Pool;

if (ENV === 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT as string),
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

if (ENV === 'dev') {
    Client = new Pool({
        host: POSTGRES_HOST,
        port: parseInt(POSTGRES_PORT as string),
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })
}

console.log(ENV)

// @ts-ignore
export default Client