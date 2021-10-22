import BaseAtom from './base';
import { Atom, AtomOptions, AtomKey } from '../shared/types';

export const store = new Map<AtomKey, Atom>();

export default function atom(options: AtomOptions) {
  const { key, default: value } = options;
  const instance = BaseAtom.of(key, value);
  store.set(key, instance);
  return instance;
}
