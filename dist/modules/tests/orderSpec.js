"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const store = new order_1.OrderStore();
describe("Order Model", () => {
    it('create method should add a order', async () => {
        const result = await store.create({
            user_id: '1',
            status: 'closed',
            total: 100,
            shipping: 10
        });
        expect(result).toEqual({
            id: result.id,
            user_id: '1',
            status: 'closed',
            total: 100,
            shipping: 10
        });
    });
});
