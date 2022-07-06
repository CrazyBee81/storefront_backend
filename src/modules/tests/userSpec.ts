import { User, UserStore } from '../modules/user';

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
            firstName: 'Volodymyr',
            lastName: 'Zelenskyy',
            password: 'freedom'
        });
        expect(result).toEqual({
            firstName: "Volodymyr",
            lastName: 'Zelenskyy',
            password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiVm9sb2R5bXlyIiwibGFzdG5hbWUiOiJaZWxlbnNreXkiLCJwYXNzd29yZCI6IiQyYiQxMCRaTW9acDFvcUVWV2J5VWNRc205em4ucm1JQzR0emY1UFAyVW5SVFYvQ2RNcFVrcndOd2Y3QyIsImlhdCI6MTY0NjczMDA1MX0.CG_4o5Mb0QbNKH0XZos2SN6gbg_2GD1i2sSsZ940hqQ'
        });
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            firstName: "Volodymyr",
            lastName: 'Zelenskyy',
            password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiVm9sb2R5bXlyIiwibGFzdG5hbWUiOiJaZWxlbnNreXkiLCJwYXNzd29yZCI6IiQyYiQxMCRaTW9acDFvcUVWV2J5VWNRc205em4ucm1JQzR0emY1UFAyVW5SVFYvQ2RNcFVrcndOd2Y3QyIsImlhdCI6MTY0NjczMDA1MX0.CG_4o5Mb0QbNKH0XZos2SN6gbg_2GD1i2sSsZ940hqQ'
        }]);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            firstName: "Volodymyr",
            lastName: 'Zelenskyy',
            password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiVm9sb2R5bXlyIiwibGFzdG5hbWUiOiJaZWxlbnNreXkiLCJwYXNzd29yZCI6IiQyYiQxMCRaTW9acDFvcUVWV2J5VWNRc205em4ucm1JQzR0emY1UFAyVW5SVFYvQ2RNcFVrcndOd2Y3QyIsImlhdCI6MTY0NjczMDA1MX0.CG_4o5Mb0QbNKH0XZos2SN6gbg_2GD1i2sSsZ940hqQ'
        });
    });
});