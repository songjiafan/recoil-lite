/**
 * @name 分布式state
 */
import { Atom, Subscription, AtomValue, AtomKey, ItemType } from '../shared/types';

interface BaseOptions {
  key: AtomKey;
  value: AtomValue;
  type: ItemType;
}

export default class BaseStateItem implements Atom {
  private _subscription: Subscription;
  private _key: AtomKey;
  private _value: AtomValue;
  private _type: ItemType;

  constructor(_options: BaseOptions) {
    this._key = _options.key;
    this._value = _options.value;
    this._type = _options.type;
  }

  getKey = (): AtomKey => {
    return this._key;
  }

  getType = (): ItemType => {
    return this._type;
  }

  setSubscription = (subscription: Subscription) => {
    if (!this._subscription) {
      this._subscription = subscription;
    }
  }

  getSubscription = (): Subscription => {
    return this._subscription;
  }

  getSnapShot = (): AtomValue => {
    return this._value;
  }

  update = <T>(value: T) => {
    if (typeof value === 'function') {
      this._value = value(this._value);
    } else {
      this._value = value;
    }
    return this._subscription.publish(this.getSnapShot());
  }
}