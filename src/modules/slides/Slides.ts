import { autoBind } from "../../lib/util";

export default class Slides {
  private slides: any[];
  private index: number = 0;

  constructor(slides: any[]) {
    this.slides = slides;
    autoBind(this);
  }
  /**
   * Get current position
   * @returns number Current position
   */
  get position(): number {
    return this.index;
  }

  public static create(slides: any[]) {
    return new Slides(slides);
  }
  /**
   * Get current slide
   * @returns any Current slide
   */
  get current(): any {
    if (this.index > this.slides.length) {
      throw new Error('Slides position out of range');
    }
    if (!this.slides.length) {
      return null;
    }
    return this.slides[this.index];
  }
  /**
   * Return current slide and then go to the next slide
   * After that current slide will be next
   * @returns any Current slide
   */
  public next(): any {
    if (this.index > this.slides.length) {
      throw new Error('Slides position out of range');
    }
    if (!this.slides.length) {
      return null;
    }
    const next = this.slides[this.index++];
    if (this.index >= this.slides.length) {
      this.index = 0;
    }
    return next;
  }
  /**
   * Set slides position to 0
   */
  public reset() {
    this.index = 0;
  }
  
  /**
   * Set slides position
   * @param  {number} position
   */
  public set(position: number) {
    if (position !== 0 && position >= this.slides.length || position < 0) {
      throw new Error('Slides position out of range');
    }
    this.index = position;
  }
}
