import { default as atom } from './atom';
import { SelectorOptions, Atom } from '../shared/types';

export default function selector(options: SelectorOptions) {
  const { key, get: reducer } = options;
  if (typeof reducer !== 'function') {
    throw TypeError('get must be function');
  }

  const result = reducer({
    get: (atom: Atom) => {
      return atom.getSnapShot();
    },
  });

  return atom({
    key,
    default: result,
  });
}
