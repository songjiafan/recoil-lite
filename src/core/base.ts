import { Atom, Subscription, AtomValue, AtomKey } from '../shared/types';
import { createAtomSubscription } from '../kit/subscription';

export default class BaseAtom implements Atom {
  subscription: Subscription;

  // private static _SUBSCRIBE_KEY_ = '_RECOIL_LITE_UPDATE_EVENT';

  constructor(public key: AtomKey, public value: AtomValue) {
    this.subscription = createAtomSubscription(key);
  }

  getSnapShot = (): AtomValue => {
    return this.value;
  }

  update = <T>(value: T) => {
    this.value = value;
    return this.subscription.publish(this.getSnapShot());
  }

  static of(key: AtomKey, value: AtomValue) {
    return new BaseAtom(key, value);
  }
}