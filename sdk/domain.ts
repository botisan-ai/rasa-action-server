import { IAction } from './action';

export class ActionDomain implements IActionDomain {
  constructor(private readonly payload: IAction['domain']) {
    //
  }

  public get(key: keyof IAction['domain']) {
    return this.payload[key];
  }
}

export interface IActionDomain {
  get(key: keyof IAction['domain']): any;
}
