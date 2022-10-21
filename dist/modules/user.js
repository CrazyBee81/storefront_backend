"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname,lastname,password, mail, address,city, zipCode, state, creditcard) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
            // hashing password
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash, u.mail, u.address, u.city, u.zipCode, u.state, u.creditcard]);
            const user = result.rows[0];
            console.log(user);
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`could not create user ${u.firstname} ${u.lastname}. Error: ${err}`);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();
            return users;
        }
        catch (err) {
            throw Error('could not get users');
        }
    }
    async authenticate(u) {
        try {
            // hashing password
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE mail = ($1)';
            const result = await conn.query(sql, [u.mail]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(u.password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
            conn.release();
        }
        catch (err) {
            throw new Error(`could not get user with ${u.mail}. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT *
                         FROM users
                         WHERE id = ($1)`;
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw Error(`could not get user with id ${id}. Error: ${err}`);
        }
    }
}
exports.UserStore = UserStore;
