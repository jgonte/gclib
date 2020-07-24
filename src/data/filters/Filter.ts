export default abstract class Filter {
  /**
   * The function that builds the OData fragment out of the filter
   */
  abstract build(): string
}
