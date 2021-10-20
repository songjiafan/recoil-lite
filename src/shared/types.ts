export interface Atom {
  value: any;
  getSnapShot: () => any,
  update: <T>(value: T) => boolean,
  subscribe: <Function>(value: Function) => void,
  unSubscribe: <Function>(value: Function) => void,
}