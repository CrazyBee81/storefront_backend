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
            const sql = 'INSERT INTO users (firstname,lastname,password, mail, address,city, zip, state, card) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
            // hashing password
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = process.env.SALT_ROUNDS;
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, hash, u.mail, u.address, u.city, u.zipCode, u.state, u.creditcard]);
            const user = result.rows[0];
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
