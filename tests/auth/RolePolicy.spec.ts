import { RolePolicy } from '../../src/gclib';

describe("RolePolicy test", () => {

    it("When the policy has no roles to show or enable set, it allows to show and enable for any role", async () => {

        const userRoles: string[] = ["reader"];

        const rolePolicy = new RolePolicy(
            /*showForRoles*/
            /*enableForRoles*/
        );

        expect(rolePolicy.canShow(userRoles)).toEqual(true);

        expect(rolePolicy.canEnable(userRoles)).toEqual(true);
    });

    it("When the policy has a role to show or enable set, it allows to show and enable for any role that matches the roles of the policy to show or enable", async () => {

        const userRoles: string[] = ["reader", "admin"];

        const rolePolicy = new RolePolicy(
            /*showForRoles*/
            ["reader", "admin"],
            /*enableForRoles*/
            ["writer"]
        );

        expect(rolePolicy.canShow(userRoles)).toEqual(true);

        expect(rolePolicy.canEnable(userRoles)).toEqual(false);
    });

    it("When the policy has a role to show or enable set, it allows to show and enable for any role that matches the roles of the policy to show or enable", async () => {

        const userRoles: string[] = ["reader", "admin"];

        const rolePolicy = new RolePolicy(
            /*showForRoles*/
            ["reader", "admin"],
            /*enableForRoles*/
            ["writer", "admin"]
        );

        expect(rolePolicy.canShow(userRoles)).toEqual(true);

        expect(rolePolicy.canEnable(userRoles)).toEqual(true);
    });

});
