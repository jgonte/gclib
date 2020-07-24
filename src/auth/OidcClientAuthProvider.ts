import { UserManager } from 'oidc-client'
import AuthProvider from './AuthProvider'
import OidcClientAuthProviderConfig from './OidcClientAuthProviderConfig'
import RequestHeader from '../data/RequestHeader'

export default class OidcClientAuthProvider implements AuthProvider {
  private _userManager: UserManager

  constructor(config: OidcClientAuthProviderConfig) {
    this._userManager = new UserManager(config)
  }

  login() {
    this._userManager.signinRedirect()
  }

  logout() {
    this._userManager.signoutRedirect()
  }

  async authorize() {
    const user = await this._userManager.getUser()

    if (user) {
      return new RequestHeader('Authorization', `Bearer ${user.access_token}`)
    } else {
      this.onNotLoggedIn()
    }
  }

  onNotLoggedIn() {
    this.login()
  }
}
