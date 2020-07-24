import Loader from './Loader'
import LoaderConfig from './LoaderConfig'
import { buildParams, ParameterBuilderResult } from '../utils'
import SingleItemLoaderConfig from './SingleItemLoaderConfig'

export default class SingleItemLoader extends Loader {
  buildUrl(cfg: SingleItemLoaderConfig): string {
    const qs: string[] = []

    const result: ParameterBuilderResult = buildParams(cfg.url, cfg.params)

    const url: string = result.url

    if (result.params) {
      qs.push(result.params)
    }

    const select = this.buildSelect(cfg.fields)

    if (select) {
      qs.push(`$select=${select}`)
    }

    return qs.length ? `${url}?${qs.join('&')}` : url
  }
}
