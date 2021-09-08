export interface IConstructor<T> {
  new (...args: any[]): T;
  name: string;
}

export interface IObjectLiteral<V = any> {
  [key: string]: V;
}
