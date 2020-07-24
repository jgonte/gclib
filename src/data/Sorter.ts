export default class Sorter {
  constructor(
    /**
     * The name of the field to sort
     */
    public field: string,

    /**
     * The sort order of the field
     */
    public order: 'asc' | 'desc'
  ) {}
}
