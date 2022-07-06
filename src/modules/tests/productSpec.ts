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
            password: 'freedom'
        });
        expect(result).toEqual({//@ts-ignore
            id: result.id,
            firstname: "Volodymyr",
            lastname: 'Zelenskyy',
            password: result.password
        });
    });
    it('index method should return a list of users', async () => {
        const result = await store.index();

        expect(result).toEqual([{//@ts-ignore
            id: result.id,
            firstname: "Volodymyr",
            lastname: 'Zelenskyy',
            //@ts-ignore
            password: result.password
        }]);
    });
    it('show method should return the correct user', async () => {
        const result = await store.show("1");

        expect(result).toEqual({//@ts-ignore
            id: result.id,
            firstname: "Volodymyr",
            lastname: 'Zelenskyy',
            password: result.password

        });
    });

});