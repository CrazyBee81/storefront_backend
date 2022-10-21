import { User, UserStore } from '../user';

const store = new UserStore()

describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create({
            firstname: 'Volodymyr',
            lastname: 'Zelenskyy',
            password: 'freedom',
            mail: 'president@ukrain.uk',
            address: 'main street 123',
            city: 'Kiew',
            zipCode: 12345,
            state: 'ukrain',
            creditcard: 1234567891
        });
        expect(result).toEqual({//@ts-ignore
            id: result.id,
            firstname: "Volodymyr",
            lastname: 'Zelenskyy',
            password: result.password,
            mail: 'president@ukrain.uk',
            address: 'main street 123',
            city: 'Kiew',
            zipCode: 12345,
            state: 'ukrain',
            creditcard: 1234567891
        });
    });
    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        expect(result).toEqual({//@ts-ignore
            firstname: "Volodymyr",
            lastname: 'Zelenskyy',
            password: result.password,
            mail: 'president@ukrain.uk',
            address: 'main street 123',
            city: 'Kiew',
            zipCode: 12345,
            state: 'ukrain',
            creditcard: 1234567891

        });
    });

});