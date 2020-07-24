import Filter from './Filter'

/**
 * A 'not' filter
 */
export class NotFilter extends Filter {
  constructor(
    /**
     * The child filter of this filter
     */
    public filter: Filter
  ) {
    super()
  }

  build(): string {
    if (!this.filter) {
      throw new Error(`Not filter requires one child filter.`)
    }

    const childFilter = this.filter.build() // Recurse

    return `not ${childFilter}`
  }
}
