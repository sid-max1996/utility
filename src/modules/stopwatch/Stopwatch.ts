import { getPerformance } from './performance';

export default class Stopwatch {
  private performance: { now(): number } | null = null;
  private pausedTime: number = 0;
  private startTime: number = 0;
  private _elapsedTime: number = 0;
  private stoped: boolean = true;

  constructor() {
    this.performance = getPerformance();
  }

  public static create(): Stopwatch {
    return new Stopwatch();
  }

  public get elapsedTime(): number {
    return this._elapsedTime;
  }

  public start(): void {
    this.stoped = false;
    if (this.performance) {
      this.startTime = this.performance.now();
    } else {
      this.startTime = Date.now();
    }
  }

  public clear(): void {
    this._elapsedTime = 0;
    this.pausedTime = 0;
    this.startTime = 0;
    this.stoped = true;
    
  }

  public restart(): void {
    this.clear();
    this.start();
  }

  private getNowTime(): number {
    let nowTime: number = 0;
    if (this.performance) {
      nowTime = this.performance.now();
    } else {
      nowTime = Date.now();
    }
    return nowTime;
  }

  public pause(): number {
    if (this.stoped) {
      this._elapsedTime = 0;
      return this._elapsedTime;
    }
    const nowTime = this.getNowTime();
    this.pausedTime += nowTime - this.startTime;
    this.startTime = 0;
    this._elapsedTime = this.pausedTime;
    return this._elapsedTime;
  }

  public stop(): number {
    if (this.stoped) {
      this._elapsedTime = 0;
      return this._elapsedTime;
    }
    const nowTime = this.getNowTime();
    this._elapsedTime = nowTime - this.startTime + this.pausedTime;
    this.startTime = 0;
    this.pausedTime = 0;
    this.stoped = true;
    return this._elapsedTime;
  }
}