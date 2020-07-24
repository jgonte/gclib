import RequestHeader from '../data/RequestHeader'

/**
 * Defines the functionality of an authentication/authorization provider
 */
export default interface AuthProvider {
  /**
   * The function that does the login
   */
  login: () => void

  /**
   * The function that does the logout
   */
  logout: () => void

  /**
   * The function that sets up the authorization header
   */
  authorize: () => Promise<RequestHeader | undefined>

  /**
   * Handler when the user is not logged in while trying to authorize
   */
  onNotLoggedIn: () => void
}
