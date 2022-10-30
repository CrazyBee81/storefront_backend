import { OrderStore } from '../order';

const store = new OrderStore()

describe("Order Model", () => {
    it('create method should add a order', async () => {
        const result = await store.create({
            user_id: '1',
            status: 'closed',
            total: 100,
            shipping: 10
        });

        expect(result).toEqual({//@ts-ignore
            id: result.id,
            user_id: '1',
            status: 'closed',
            total: 100,
            shipping: 10
        });
    });
});

