import { DashboardStore } from '../dashboard';
import {Order,OrderStore} from "../order";

const store = new DashboardStore()
const OrderStoreStore = new OrderStore()

describe("Dashboard Model", () => {
    var test = OrderStoreStore.create({
        user_id: '1',
        status: 'open'
    })
    console.log(test)
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

});