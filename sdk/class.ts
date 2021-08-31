export interface IConstructor<T> {
  new (...args: any[]): T;
}

export interface IObjectLiteral<V = any> {
  [key: string]: V;
}
