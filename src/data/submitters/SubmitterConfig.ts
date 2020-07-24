import RequesterConfig from '../RequesterConfig'
import { RequestHeader } from '../../gclib'
import AuthProvider from '../../auth/AuthProvider'

export default class SubmitterConfig extends RequesterConfig {
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
     * The method to call
     */
    public method: 'post' | 'put' | 'delete',

    /**
     * The data submitted to the server
     */
    public data: string | object,

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
  ) {
    super(url, onError, headers, params, authProvider)
  }
}
