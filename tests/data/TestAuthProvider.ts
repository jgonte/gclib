import AuthProvider from "../../src/auth/AuthProvider";
import RequestHeader from "../../src/data/RequestHeader";

export default class TestAuthProvider implements AuthProvider {

    login() {
        // Do nothing
    }

    logout() {
        // Do nothing
    }

    async authorize() {

        return new Promise<RequestHeader>((resolve, reject) => {
            resolve(new RequestHeader("Authorization", "Bearer eyJhGci0i"));
        }); ;
    }

    onNotLoggedIn() {
        // Do nothing
    }

}