import Loader from './Loader'
import CollectionLoaderConfig from './CollectionLoaderConfig'
import { buildParams, ParameterBuilderResult } from '../utils'
import Filter from '../filters/Filter'
import Sorter from '../Sorter'

/**
 * Loader of a collection of items using OData specifications
 */
export default class CollectionLoader extends Loader {
  buildUrl(cfg: CollectionLoaderConfig): string {
    const qs: string[] = []

    const result: ParameterBuilderResult = buildParams(cfg.url, cfg.params)

    const url: string = result.url

    if (result.params) {
      qs.push(result.params)
    }

    if (cfg.top) {
      qs.push(`$top=${cfg.top}`)
    }

    if (cfg.skip || cfg.skip === 0) {
      qs.push(`$skip=${cfg.skip}`)
    }

    const select = this.buildSelect(cfg.fields)

    if (select) {
      qs.push(`$select=${select}`)
    }

    const filter = this.buildFilter(cfg.filter)

    if (filter) {
      qs.push(`$filter=${filter}`)
    }

    const orderBy = this.buildOrderBy(cfg.sorters)

    if (orderBy) {
      qs.push(orderBy)
    }

    return qs.length ? `${url}?${qs.join('&')}` : url
  }

  buildFilter(filter?: Filter): string | null {
    return filter ? filter.build() : null
  }

  buildOrderBy(sorters?: Sorter[]): string | null {
    return sorters && sorters.length
      ? `$orderby=${sorters.map(item => `${item.field} ${item.order}`).join(', ')}`
      : null
  }
}
