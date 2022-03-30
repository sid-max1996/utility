interface ITimerParams {
  startImmediately?: boolean // start timer immediately
  instantStart?: boolean // short alias for startImmediately
  firstRunImmediately?: boolean // first run of the timer function immediately
  instantExecute?: boolean // short alias for firstRunImmediately
  repeatCount?: number // how many times to repeat the timer function call
  endlessly?: boolean // repeat timert function call endlessly
  notWaitAsyncTask?: boolean // do not wait for the async timer function to complete before starting the next timer
  stopOnSuccess?: boolean // call the stop method on the timer if no errors occur during timer function execution
  stopOnError?: boolean // call the stop method on the timer if an error occur during timer function execution
  stopOnTrue?: boolean // call the stop method on the timer if the function returns true
  noThrowError?: boolean // do not throw err if an error in timer function occur
}

export default class Timer {
  private timeoutId: any;
  private callback: Function;
  private time: number;
  private params: ITimerParams;
  private _launched: boolean = false;
  private _repeatCount: number | null = null;
  /**
   * @param  {Function} callback callback function
   * @param  {number} time timer time
   * @param  {ITimerParams} params timer params
   */
  constructor(callback: Function, time: number, params: ITimerParams = {}) {
    if (time < 0) {
      throw new Error('Timer time < 0');
    }
    this.callback = callback;
    this.time = time;
    this.params = { ...params }; // all properties are primitive so they can be copied via ...
    if (typeof this.params.repeatCount === 'number' && this.params.repeatCount < 0) {
      throw new Error('Timer repeatCount < 0');
    }
    if (this.params.startImmediately || this.params.instantStart) {
      this.start();
    }
  }
  /**
   * Create Timer instance without new keyword
   * @returns Timer
   */
  static create(callback: Function, time: number, params: ITimerParams = {}): Timer {
    return new Timer(callback, time, params);
  }
  /**
   * Wait some time before continie
   * @param  {number} time
   */
  static async wait(time: number) {
    if (time < 0) return;
    await new Promise(resolve => setTimeout(resolve, time));
  }
  /**
   * Whether the timer is running now
   * @returns boolean
   */
  get launched(): boolean {
    return this._launched;
  }

  private set launched(value: boolean) {
    this._launched = value;
    if (typeof this.params.repeatCount === 'number' && this._launched) {
      this._repeatCount = this.params.repeatCount; // setting the number of repetitions
    }
  }
  
  /**
   * How many repetitions are left to do
   * @returns number
   */
  get repeatCount(): number {
    return this._repeatCount ?? 0;
  }

  /**
   * Run execution of timer function
   * @returns Promise<void>
   */
   private async runCallback(): Promise<void> {
    try {
      const res = this.callback();
      if (res instanceof Promise) {
        if (!this.params.notWaitAsyncTask) {
          await res;
        } else {
          res.then(value => {
            if (this.params.stopOnSuccess || (this.params.stopOnTrue && value === true)) {
              this.stop();
            }
          }).catch(err => {
            if (!this.params.noThrowError) {
             throw err;
            }
            if (this.params.stopOnError) {
              this.stop();
            }
          });
        }
      } else if (this.params.stopOnSuccess || (this.params.stopOnTrue && res === true)) {
        this.launched = false;
      }
    } catch (err) {
      if (!this.params.noThrowError) {
        throw err;
      }
      if (this.params.stopOnError) {
        this.launched = false;
      }
    }
  }

  private async callbackWrapper () {
    try {
      await this.runCallback();
    } finally {
      if (this.launched) {
        if (this.params.endlessly) { // endlessly timer
          this.runTimeout();
        } else if (this._repeatCount !== null) { // repeating timer
          if (this._repeatCount > 0) {
            this._repeatCount--;
            this.runTimeout();
          } else {
            this.launched = false;
          }
        } else { // simple timer
          this.launched = false;
        }
      }
    }
  }

  private async runTimeout (first: boolean = false) {
    if (first && (this.params.firstRunImmediately || this.params.instantExecute)) {
      this.callbackWrapper();
    } else {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.callbackWrapper.bind(this), this.time);
    }
  }

  get method(): Function {
    return this.callback;
  }

  start () {
    this.launched = true;
    this.runTimeout(true);
  }

  stop () {
    clearTimeout(this.timeoutId);
    this.launched = false;
  }

  restart() {
    this.stop();
    this.start();
  }
}
