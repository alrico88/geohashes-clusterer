export class Bucket {
  public start: number;
  public end: number;
  public tag: string;

  /**
   * Creates an instance of Bucket.
   * @param  {number} start Starting value for the bucket. The bucket will contain values equal or greater than this
   * @param  {number} end Ending value for the bucket. The bucket will contain values smaller than this
   * @memberof Bucket
   */
  public constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.tag = `${start}-${end}`;
  }

  /**
   * Checks if value is in bucket
   * @param  {number} n Value to check
   * @return {boolean} Whether the value is in the bucket
   * @memberof Bucket
   */
  isInBucket(n: number): boolean {
    return n >= this.start && n < this.end;
  }
}
