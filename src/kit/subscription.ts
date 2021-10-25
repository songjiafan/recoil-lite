import { Atom, AtomKey, EventCallBack, AtomValue } from '../shared/types';
import { store } from '../core/atom';
import { EventEmitter } from 'events';

export const GLOBAL_SUBSCRIPTION_KEY = 'RECOIL_GLOBAL_SUBSCRIPTION';

const createEventEmitter = () => new EventEmitter();

const atomEventsEmitter = createEventEmitter();

export const createAtomSubscription = (key: AtomKey): any => {
  return {
    publish: (value: AtomValue) => atomEventsEmitter.emit(key, value),
    subscribe: (fn: EventCallBack) => atomEventsEmitter.on(key, fn),
    unSubscribe: (fn: EventCallBack) => atomEventsEmitter.removeListener(key, fn),
  };
}

export default function createSubscription(...atoms: Atom[]) {
  const instance = createEventEmitter();

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