import { Product, ProductStore } from '../product';

const store = new ProductStore()

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Nivea',
            price: '4',
            category: 'cream'
        });
        expect(result).toEqual({//@ts-ignore
            id: result.id,
            name: 'Nivea',
            //@ts-ignore
            price: 4,
            category: 'cream'
        });
    });
    it('index method should return a list of product', async () => {
        const result = await store.index();

        expect(result).toContain({//@ts-ignore
            id: result[0].id,
            name: 'Nivea',
            //@ts-ignore
            price: 4,
            category: 'cream'
        });
    });
    it('show method should return the correct product', async () => {
        const result = await store.show("1");

        expect(result).toEqual({//@ts-ignore
            id: result.id,
            name: 'Nivea',
            //@ts-ignore
            price: 4,
            category: 'cream'

        });
    });

});