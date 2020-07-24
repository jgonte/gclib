/**
 * The header information
 */
export default class RequestHeader {
  constructor(
    /**
     * The key of the header
     */
    public key: string,

    /**
     * The value of the header
     */
    public value: string
  ) {}
}
