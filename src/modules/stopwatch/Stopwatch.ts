export interface IPerformance {
  now(): number;
}

export default class Stopwatch {
  private performance: IPerformance;
  private pausedTime: number = 0;
  private startTime: number = 0;
  private _elapsedTime: number = 0;
  private stoped: boolean = true;

  constructor(performance: IPerformance) {
    this.performance = performance;
  }

  public static create(performance: IPerformance): Stopwatch {
    return new Stopwatch(performance);
  }

  public get elapsedTime(): number {
    return this._elapsedTime;
  }

  public start(): void {
    this.stoped = false;
    this.startTime = this.performance.now();
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

  public pause(): number {
    if (this.stoped) {
      this._elapsedTime = 0;
      return this._elapsedTime;
    }
    const nowTime = this.performance.now();
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
    const nowTime = this.performance.now();
    this._elapsedTime = nowTime - this.startTime + this.pausedTime;
    this.startTime = 0;
    this.pausedTime = 0;
    this.stoped = true;
    return this._elapsedTime;
  }
}