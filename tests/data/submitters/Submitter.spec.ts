import {
    RequestHeader,
    SubmitterConfig,
    Submitter,
    appCtrl
} from "../../../src/gclib";

import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import TestAuthProvider from "../TestAuthProvider";

enableFetchMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});

// Initialize the authProvider of the app controller
appCtrl.authProvider = new TestAuthProvider();

/**
 * Submitter test
 */
describe("Submitter test", () => {

    it("submits data", async () => {

        fetchMock.mockResponse(JSON.stringify({
            id: 1
        }));

        const config = new SubmitterConfig(
            /*url*/
            'https://someurl.dev',
            /*onError*/
            (error) => console.log(error),
            /*method*/
            "post",
            /*data*/
            {
                name: 'Sarah'
            },
            /*headers*/
            [
                new RequestHeader('Header1', 'abc')
            ],
            /*params*/
            {
                param1: 34,
                param2: 'some text'
            },
            /*authProvider*/
            appCtrl.authProvider
        );

        const submitter = new Submitter();

        const data = await submitter.submit(config);

        expect(data.id).toEqual(1);

        const body = JSON.stringify({
            name: 'Sarah'
        });

        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        headers.append('Header1', 'abc');

        headers.append('Authorization', 'Bearer eyJhGci0i');

        const method = "post";

        expect(fetchMock).toHaveBeenCalledWith(
            'https://someurl.dev?param1=34&param2=some text',
            {
                body,
                headers,
                method
            }
        );

    });

    it("calls the onError function when there is an error", async () => {

        fetchMock.mockReject(() => Promise.reject('invalid content type'));

        let caughtError: Error | undefined;

        const config = new SubmitterConfig(
            /*url*/
            'https://someurl.dev',
            /*onError*/
            (error) => caughtError = error,
            /*method*/
            "post",
            /*data*/
            {
                name: 'Sarah'
            },
            /*headers*/
            [
                new RequestHeader('Header1', 'abc')
            ],
            /*params*/
            {
                param1: 34,
                param2: 'some text'
            },
            /*authProvider*/
            appCtrl.authProvider
        );

        const submitter = new Submitter();

        const data = await submitter.submit(config);

        expect(caughtError).toEqual('invalid content type');

    });

});
