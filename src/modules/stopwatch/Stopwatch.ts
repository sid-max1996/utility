import { autoBind } from '../../lib/util';

export interface IPerformance {
  now(): number;
}

export default class Stopwatch {
  private performance: IPerformance;
  private pausedTime: number = 0;
  private startTime: number = 0;
  private _elapsedTime: number = 0;
  private stoped: boolean = true;
  private paused: boolean = false;

  constructor(performance: IPerformance) {
    this.performance = performance;
    autoBind(this);
  }

  public static create(performance: IPerformance = { now: Date.now }): Stopwatch {
    return new Stopwatch(performance);
  }

  public get elapsedTime(): number {
    if (this.stoped || this.paused) {
      return this._elapsedTime;
    }
    return this._calcElapsedTime();
  }

  public start(): void {
    this.stoped = false;
    this.paused = false;
    this.startTime = this.performance.now();
  }

  public clear(): void {
    this._elapsedTime = 0;
    this.pausedTime = 0;
    this.startTime = 0;
    this.stoped = true;
    this.paused = false;
  }

  public restart(): void {
    this.clear();
    this.start();
  }

  public pause(): number {
    if (this.stoped) {
      this._elapsedTime = 0;
      return this._elapsedTime;
    }
    this.paused = true;
    this.pausedTime = this._calcElapsedTime();
    this.startTime = 0;
    this._elapsedTime = this.pausedTime;
    return this._elapsedTime;
  }

  private _calcElapsedTime() {
    const nowTime = this.performance.now();
    return nowTime - this.startTime + this.pausedTime;
  }

  public stop(): number {
    if (this.stoped) {
      this._elapsedTime = 0;
      return this._elapsedTime;
    }
    this._elapsedTime = this._calcElapsedTime();
    this.startTime = 0;
    this.pausedTime = 0;
    this.stoped = true;
    return this._elapsedTime;
  }
}
