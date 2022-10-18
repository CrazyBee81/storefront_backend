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
            name: 'Book',
            price: '4',
            category: 'cream',
            url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",\n',
            description: 'You can read it!'
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