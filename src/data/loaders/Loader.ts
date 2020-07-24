import LoaderConfig from './LoaderConfig'

/**
 * Base loader class
 */
export default abstract class Loader {
  async load(cfg: LoaderConfig) {
    try {
      const response = await fetch(this.buildUrl(cfg), {
        headers: await this.buildHeaders(cfg)
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return await response.json()
    } catch (error) {
      if (cfg.onError) {
        // If there is a handler then handle it

        cfg.onError(error)
      } else {
        throw error // Re-throw
      }
    }
  }

  abstract buildUrl(cfg: LoaderConfig): string

  /**
   * Builds the headers to be sent from the key-value pair headers of the configuration
   * @param cfg
   */
  async buildHeaders(cfg: LoaderConfig): Promise<HeadersInit> {
    const headers = new Headers()

    // Append the headers from the configuration
    if (cfg.headers) {
      cfg.headers.forEach(header => headers.append(header.key, header.value))
    }

    // Add the authorization header
    if (cfg.authProvider) {
      const authHeader = await cfg.authProvider.authorize()

      if (authHeader) {
        headers.append(authHeader.key, authHeader.value)
      }
    }

    return headers
  }

  /**
   * Builds the OData fragment of $select with the list of fields to be selected
   * @param fields The array of field names
   */
  buildSelect(fields?: string[]): string | null {
    return fields && fields.length ? fields.join(',') : null
  }
}
