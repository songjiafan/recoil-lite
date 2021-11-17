import { EventEmitter } from 'events';

export type AtomValue = any;
export type AtomKey = string | symbol;
export type EventCallBack = (...args: any[]) => void;

export interface Subscription {
  subscribe: Function;
  unSubscribe: Function;
  publish: Function;
}

export enum ItemType {
  atom,
  selector,
}

export interface Atom {
  setSubscription: (sub: Subscription) => void;
  getSubscription: () => Subscription;
  getSnapShot: () => AtomValue,
  update: <T>(value: T) => boolean,
  getKey: () => AtomKey;
  getType: () => ItemType;
}

export interface AtomOptions {
  key: AtomKey;
  default: AtomValue;
}

export interface SelectorOptions {
  key: AtomKey;
  get: Function;
}