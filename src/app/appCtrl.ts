import AuthProvider from '../auth/AuthProvider'
import AppUser from '../auth/AppUser'

/**
 * The singleton application controller so it is accessable from everywhere
 */
class AppCtrl {
  /**
   * The auth provider of the application
   */
  authProvider?: AuthProvider

  /**
   * The error handler of the application
   */
  onError?: (error: Error) => void

  /** The logged in user of the application */
  user?: AppUser
}

const appCtrl = new AppCtrl()

export default appCtrl
