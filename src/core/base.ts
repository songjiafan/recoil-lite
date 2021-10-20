import { Atom } from '../shared/types';
import { EventEmitter } from 'events';

export default class BaseAtom extends EventEmitter implements Atom {
  constructor(public value: any) {
    super();
  }

  private static _SUBSCRIBE_KEY_ = 'RECOIL_LITE_UPDATE_EVENT';

  getSnapShot = () => {
    return this.value;
  }

  update = <T>(value: T) => {
    this.value = value;
    return this.notify();
  }

  subscribe = (callback): void => {
    this.on(BaseAtom._SUBSCRIBE_KEY_, callback);
  }

  unSubscribe = (callback): void => {
    this.removeListener(BaseAtom._SUBSCRIBE_KEY_, callback);
  }
  
  private notify = (): boolean => {
    return this.emit(BaseAtom._SUBSCRIBE_KEY_, this.getSnapShot());
  }

  static of(value) {
    return new BaseAtom(value);
  }
}