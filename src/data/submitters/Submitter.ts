import SubmitterConfig from './SubmitterConfig'
import { buildParams, ParameterBuilderResult } from '../utils'

export default class Submitter {
  async submit(cfg: SubmitterConfig) {
    try {
      const response = await fetch(this.buildUrl(cfg), {
        headers: await this.buildHeaders(cfg),
        method: cfg.method,
        body: JSON.stringify(cfg.data)
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

  buildUrl(cfg: SubmitterConfig): string {
    const qs: string[] = []

    const result: ParameterBuilderResult = buildParams(cfg.url, cfg.params)

    const url: string = result.url

    if (result.params) {
      qs.push(result.params)
    }

    return qs.length ? `${url}?${qs.join('&')}` : url
  }

  /**
   * Builds the headers to be sent from the key-value pair headers of the configuration
   * @param cfg
   */
  async buildHeaders(cfg: SubmitterConfig): Promise<HeadersInit> {
    const headers = new Headers()

    // Append the headers from the configuration
    if (cfg.headers) {
      cfg.headers.forEach(header => headers.append(header.key, header.value))

      // Add a default content type so it does not need to be configured by the user
      if (!cfg.headers.hasOwnProperty('Content-Type')) {
        headers.append('Content-Type', 'application/json')
      }
    } else {
      // Add a default content type so it does not need to be configured by the user

      headers.append('Content-Type', 'application/json')
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
}
