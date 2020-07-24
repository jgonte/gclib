import Filter from './Filter'

/**
 * An 'and' / 'or' filter
 */
abstract class LogicalFilter extends Filter {
  constructor(
    /**
     * The operator of the logical filter
     */
    public operator: 'and' | 'or',

    /**
     * The children filters of this filter
     */
    public filters: Filter[]
  ) {
    super()
  }

  build(): string {
    const filters = this.filters

    // TODO: Add checking for invalid parameters. In this case it must only be operator and filters

    if (!filters.length) {
      throw new Error(`Operator: '${this.operator}' requires at least one child filter.`)
    }

    return this.filters.map(item => item.build()).join(` ${this.operator} `) // Recurse
  }
}

export class AndFilter extends LogicalFilter {
  constructor(
    /**
     * The children filters of this filter
     */
    public filters: Filter[]
  ) {
    super('and', filters)
  }
}

export class OrFilter extends LogicalFilter {
  constructor(
    /**
     * The children filters of this filter
     */
    public filters: Filter[]
  ) {
    super('or', filters)
  }
}
