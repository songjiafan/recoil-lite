import { Atom, AtomKey } from '../shared/types';
import { store } from '../core/atom';
import { EventEmitter } from 'events';

export const GLOBAL_SUBSCRIPTION_KEY = 'RECOIL_GLOBAL_SUBSCRIPTION';

export const createAtomSubscription = (key: AtomKey): any => {
  const instance = new EventEmitter();

  return Object.assign(instance, {
    publish: (value: any) => instance.emit(key, value),
    subscribe: (fn) => instance.on(key, fn),
    unSubscribe: (fn) => instance.removeListener(key, fn),
  })
}

export default function createSubscription(...atoms: Atom[]) {
  const instance = new EventEmitter();

  let atomList = atoms;

  if (!atoms.length) {
    atomList = Array.from(store.values());
  }

  atoms.forEach(atom => {
    Object.assign(instance, {
      subscribe: (callback) => {
        instance.on(GLOBAL_SUBSCRIPTION_KEY, callback);
      },
    });
    atom.subscription.subscribe(instance.emit);
  })

  return instance;
}