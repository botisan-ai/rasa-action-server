import { IAction } from './action';

export class ActionDomain implements IActionDomain {
  constructor(private readonly payload: IAction['domain']) {
    //
  }

  public get() {
    return JSON.parse(JSON.stringify(this.payload));
  }
}

export interface IActionDomain {
  get(): any;
}
