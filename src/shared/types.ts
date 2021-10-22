import { EventEmitter } from 'events';

export type AtomValue = any;
export type AtomKey = string | symbol;

export interface Subscription extends EventEmitter {
  subscribe: Function;
  unSubscribe: Function;
  publish: Function;
}

export interface Atom {
  value: AtomValue;
  subscription: Subscription;
  getSnapShot: () => AtomValue,
  update: <T>(value: T) => boolean,
}

export interface AtomOptions {
  key: AtomKey;
  default: AtomValue;
}

export interface SelectorOptions {
  key: AtomKey;
  get: Function;
}