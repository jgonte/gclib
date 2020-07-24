import LoaderConfig from './LoaderConfig'
import Filter from '../filters/Filter'
import Sorter from '../Sorter'
import { RequestHeader } from '../../gclib'
import AuthProvider from '../../auth/AuthProvider'

/**
 * The configuration object passed to a collection loader
 */
export default class CollectionLoaderConfig extends LoaderConfig {
  constructor(
    /**
     * The URl to send the request to
     */
    public url: string,

    /**
     * The error handler
     */
    public onError: (error: Error) => void,

    /**
     * The headers to pass to the request
     */
    public headers?: RequestHeader[],

    /**
     * The parameters to pass to the request
     */
    public params?: any,

    /**
     * The auth provider. If it is not nil, then the loader will call its authorize method to set the authorization header
     */
    public authProvider?: AuthProvider,

    /**
     * How many records to return from a dynamic query
     */
    public top?: number,

    /**
     * How many records to skip in a dynamic query
     */
    public skip?: number,

    /**
     * The array of fields to select in a dynamic query
     */
    public fields?: string[],

    /**
     * The filter to filter by in a dynamic query
     */
    public filter?: Filter,

    /**
     * The sorters to sort by in a dynamic query
     */
    public sorters?: Sorter[]
  ) {
    super(url, onError, headers, params, authProvider)
  }
}
