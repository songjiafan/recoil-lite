import { Atom, Subscription, AtomValue, AtomKey } from '../shared/types';
import { createAtomSubscription } from '../kit/subscription';

export default class BaseState implements Atom {
  subscription: Subscription;

  constructor(public key: AtomKey, private _value: AtomValue) {
    this.subscription = createAtomSubscription(key);
  }

  getSnapShot = (): AtomValue => {
    return this._value;
  }

  update = <T>(value: T) => {
    this._value = value;
    return this.subscription.publish(this.getSnapShot());
  }

  static of(key: AtomKey, value: AtomValue) {
    return new BaseState(key, value);
  }
}