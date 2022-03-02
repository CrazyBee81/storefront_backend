import {Client, Pool} from 'pg';

const client: Client = new Client()

if (process.env.ENV === 'dev') {
    const pool = new Pool({
        host: process.env.POSTGRES_HOST,
        //@ts-ignore
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    })
}

if (process.env.ENV === 'test') {
    const pool = new Pool({
        host: process.env.POSTGRES_HOST,
        //@ts-ignore
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB_TEST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    })
}

export default client