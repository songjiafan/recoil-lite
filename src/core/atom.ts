import BaseState from './base';
import { Atom, AtomOptions, AtomKey } from '../shared/types';

export const store = new Map<AtomKey, Atom>();

export default function atom(options: AtomOptions) {
  const { key, default: value } = options;
  const instance = BaseState.of(key, value);
  if (!store.has(key)) {
    store.set(key, instance);
  } else {
    throw Error('key已存在' + String(key))
  }
  return instance;
}
