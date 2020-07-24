import LoaderConfig from './LoaderConfig'
import { RequestHeader } from '../../gclib'
import AuthProvider from '../../auth/AuthProvider'

export default class SingleItemLoaderConfig extends LoaderConfig {
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
     * The array of fields to select in a dynamic query
     */
    public fields?: string[]
  ) {
    super(url, onError, headers, params, authProvider)
  }
}
