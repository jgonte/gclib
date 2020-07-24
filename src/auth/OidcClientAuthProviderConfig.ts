export default class OidcClientAuthProviderConfig {
  constructor(
    public authority: string,

    public client_id: string,

    public redirect_uri: string,

    public response_type: string,

    public scope: string,

    public post_logout_redirect_uri: string
  ) {}
}
