import { autoBind } from "../../lib/util";

interface DropperParams {
  runLastDroppedInTheEnd?: boolean; // run last dropped in the end
  notWaitAsyncTask?: boolean; // do not wait for the async callback
}

type DropperFunction = (...args: any[]) => Promise<void>;

// Do not call a function if it is in progress
export default class Dropper {
  private dropperFunction: DropperFunction;

  constructor(callback: Function, params: DropperParams = {}) {
    this.dropperFunction = this.createDropperFunction(callback, params);
    autoBind(this);
  }

  public static create(callback: Function, params: DropperParams = {}): Dropper {
    return new Dropper(callback, params);
  }

  private createDropperFunction (callback: Function, params: DropperParams): DropperFunction {
    let running: boolean = false;
    let lastDroppedArgs: any[] | null = null;
    const func =  async (args: any[]) => {
      if (running) {
        if (params.runLastDroppedInTheEnd) {
          lastDroppedArgs = args;
        }
        return;
      }
      running = true;
      try {
        const res = callback(...args);
        if (res instanceof Promise && !params.notWaitAsyncTask) {
          await res;
        }
      } finally {
        running = false;
        if (params.runLastDroppedInTheEnd && lastDroppedArgs) {
          func(lastDroppedArgs);
          lastDroppedArgs = null;
        }
      }
    }
    return func;
  }

  async execute (...args: any[]) {
    await this.dropperFunction(args);
  }
}
