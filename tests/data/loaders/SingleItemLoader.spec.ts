import {
  RequestHeader,
  SingleItemLoaderConfig,
  SingleItemLoader,
  AndFilter,
  IsEqualFilter,
  IsNotEqualFilter,
  IsGreaterThanFilter,
  IsGreaterOrEqualFilter,
  IsLessThanFilter,
  IsLessOrEqualFilter,
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
 * SingleItemLoader test
 */
describe("SingleItemLoader test", () => {

  it("loads a SingleItem", async () => {

    fetchMock.mockResponse(JSON.stringify(
      {
        id: 1,
        name: 'Sarah'
      }));

    const config = new SingleItemLoaderConfig(
      /*url*/
      'https://someurl.dev',
      /*onError*/
      (error) => console.log(error),
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

    const singleItemLoader = new SingleItemLoader();

    const data = await singleItemLoader.load(config);

    expect(data.id).toEqual(1);

    expect(data.name).toEqual('Sarah');

    const headers = new Headers();

    headers.append('Header1', 'abc')

    headers.append('Authorization', 'Bearer eyJhGci0i');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://someurl.dev?param1=34&param2=some text', {
      headers
    });

  });

  it("loads a SingleItem using extended parameters", async () => {

    fetchMock.mockResponse(JSON.stringify(
      {
        id: 1,
        name: 'Sarah'
      }));

    const config = new SingleItemLoaderConfig(
      /*url*/
      'https://someurl.dev',
      /*onError*/
      (error) => console.log(error),
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
      appCtrl.authProvider,
      /*fields*/
      [
        "field1",
        "field2",
        "field3"
      ]
    );

    const singleItemLoader = new SingleItemLoader();

    const data = await singleItemLoader.load(config);

    expect(data.id).toEqual(1);

    expect(data.name).toEqual('Sarah');

    const headers = new Headers();

    headers.append('Header1', 'abc');

    headers.append('Authorization', 'Bearer eyJhGci0i');

    expect(fetchMock).toHaveBeenCalledWith(
      "https://someurl.dev?param1=34&param2=some text&$select=field1,field2,field3", {
      headers
    });

  });

  it("calls the onError function when there is an error", async () => {

    fetchMock.mockReject(() => Promise.reject('invalid content type'));

    let caughtError: Error | undefined;

    const config = new SingleItemLoaderConfig(
      'https://someurl.dev',
      (error) => {
        caughtError = error;
      }
    );

    const singleItemLoader = new SingleItemLoader();

    const data = await singleItemLoader.load(config);

    expect(caughtError).toEqual('invalid content type');

  });

});
