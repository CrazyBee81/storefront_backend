import { DashboardStore } from '../dashboard';
import {Order,OrderStore} from "../order";

const store = new DashboardStore()
const OrderStoreStore = new OrderStore()

describe("Dashboard Model", () => {
    OrderStoreStore.create({
        user_id: '1',
        status: 'open'
    })
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
        expect(result).toEqual({//@ts-ignore
            id: result.id,
            user_id: result.user_id,
            status: 'open'
        });
    });

});