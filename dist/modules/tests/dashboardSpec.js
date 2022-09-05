"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../dashboard");
const order_1 = require("../order");
const store = new dashboard_1.DashboardStore();
const OrderStoreStore = new order_1.OrderStore();
describe("Dashboard Model", () => {
    OrderStoreStore.create({
        user_id: '1',
        status: 'open'
    });
    it('should have an showCurrend method', () => {
        expect(store.showCurrent).toBeDefined();
    });
    it('should have an showCompleted method', () => {
        expect(store.showCompleted).toBeDefined();
    });
    it('should have an fiveMostPopular method', () => {
        expect(store.fiveMostPopular).toBeDefined();
    });
    it('should have an productsByCategory method', () => {
        expect(store.productsByCategory).toBeDefined();
    });
    it('showCurrent should show current order from user', async () => {
        const result = await store.showCurrent("1");
        expect(result).toEqual({
            id: result.id,
            user_id: result.user_id,
            status: 'open'
        });
    });
});
