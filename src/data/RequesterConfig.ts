import RequestHeader from './RequestHeader'
import AuthProvider from '../auth/AuthProvider'

/**
 * The configuration object passed to a loader
 */
export default class RequesterConfig {
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
    public authProvider?: AuthProvider
  ) {}
}
