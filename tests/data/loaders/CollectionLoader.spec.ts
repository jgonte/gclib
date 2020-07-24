import {
  RequestHeader,
  CollectionLoaderConfig,
  CollectionLoader,
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
import Sorter from "../../../src/data/Sorter";
import TestAuthProvider from "../TestAuthProvider";

enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

// Initialize the authProvider of the app controller
appCtrl.authProvider = new TestAuthProvider();

/**
 * CollectionLoader test
 */
describe("CollectionLoader test", () => {

  it("loads a collection", async () => {

    fetchMock.mockResponse(JSON.stringify([
      {
        id: 1,
        name: 'Sarah'
      },
      {
        id: 2,
        name: 'Mark'
      },
      {
        id: 3,
        name: 'Yana'
      }
    ]));

    const config = new CollectionLoaderConfig(
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

    const collectionLoader = new CollectionLoader();

    const data = await collectionLoader.load(config);

    expect(data.length).toEqual(3);

    expect(data[0].id).toEqual(1);

    expect(data[0].name).toEqual('Sarah');

    expect(data[1].id).toEqual(2);

    expect(data[1].name).toEqual('Mark');

    expect(data[2].id).toEqual(3);

    expect(data[2].name).toEqual('Yana');

    const headers = new Headers();

    headers.append('Header1', 'abc')

    headers.append('Authorization', 'Bearer eyJhGci0i');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://someurl.dev?param1=34&param2=some text', {
      headers
    });

  });

  it("loads a collection using extended parameters", async () => {

    fetchMock.mockResponse(JSON.stringify([
      {
        id: 1,
        name: 'Sarah'
      },
      {
        id: 2,
        name: 'Mark'
      },
      {
        id: 3,
        name: 'Yana'
      }
    ]));

    const config = new CollectionLoaderConfig(
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
      /*top*/
      10,
      /*skip*/
      20,
      /*fields*/
      [
        "field1",
        "field2",
        "field3"
      ],
      /*filter*/
      new AndFilter(
        [
          new IsEqualFilter("field1", 123),
          new IsNotEqualFilter("field2", "expired"),
          new IsGreaterThanFilter("field3", new Date(2002, 4, 25).toLocaleDateString()),
          new IsGreaterOrEqualFilter("field1", 123),
          new IsLessThanFilter("field1", 456),
          new IsLessOrEqualFilter("field3", new Date(2102, 4, 25).toLocaleDateString()),
        ]),
      /*sorters*/
      [
        new Sorter("field1", "asc"),
        new Sorter("field2", "desc")
      ]
    );

    const collectionLoader = new CollectionLoader();

    const data = await collectionLoader.load(config);

    expect(data.length).toEqual(3);

    expect(data[0].id).toEqual(1);

    expect(data[0].name).toEqual('Sarah');

    expect(data[1].id).toEqual(2);

    expect(data[1].name).toEqual('Mark');

    expect(data[2].id).toEqual(3);

    expect(data[2].name).toEqual('Yana');

    const headers = new Headers();

    headers.append('Header1', 'abc');

    headers.append('Authorization', 'Bearer eyJhGci0i');

    expect(fetchMock).toHaveBeenCalledWith(
      "https://someurl.dev?param1=34&param2=some text&$top=10&$skip=20&$select=field1,field2,field3&$filter=field1 eq 123 and field2 ne 'expired' and field3 gt '5/25/2002' and field1 ge 123 and field1 lt 456 and field3 le '5/25/2102'&$orderby=field1 asc, field2 desc", {
      headers
    });

  });

  it("calls the onError function when there is an error", async () => {

    fetchMock.mockReject(() => Promise.reject('invalid content type'));

    let caughtError: Error | undefined;

    const config = new CollectionLoaderConfig(
      'https://someurl.dev',
      (error) => {
        caughtError = error;
      }
    );

    const collectionLoader = new CollectionLoader();

    const data = await collectionLoader.load(config);

    expect(caughtError).toEqual('invalid content type');

  });

});
