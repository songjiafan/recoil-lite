/**
 * @name 中心化store
 * @description 最核心的store采用中心化的设计，用户的atom api设计为去中心化，这样既可以解耦每一条atom，又能实现底层全局操控与订阅
 */
import { Atom, AtomValue, AtomKey, EventCallBack } from '../shared/types';
import { EventEmitter } from 'events';
import { createEventListener } from '../kit/event';

class RecoilLiteStore {
  dep: Map<AtomKey, Atom>;
  eventManager: EventEmitter;

  static GLOBAL_SUBSCRIPTION_KEY = 'RECOIL_GLOBAL_SUBSCRIPTION';

  constructor() {
    this.dep = new Map();
    this.eventManager = new EventEmitter();
  }

  registerDependence = (atom: Atom) => {
    this.dep.set(atom.getKey(), atom);
  }

  checkDependenceUpdate = () => {

  }

  subscribe = (fn: EventCallBack) => {
    return this.eventManager.on(RecoilLiteStore.GLOBAL_SUBSCRIPTION_KEY, fn);
  }

  // 将单个atom key注册一个通道 到事件总线里
  registerEvent = (atom: Atom) => {
    const key = atom.getKey();
    const subscription = createEventListener(this.eventManager, key, {
      publishInterceptor: (value: AtomValue) => this.eventManager.emit(RecoilLiteStore.GLOBAL_SUBSCRIPTION_KEY, [key, value]), // pub global
    });

    atom.setSubscription(subscription);
  }
}


export const store = new RecoilLiteStore();
