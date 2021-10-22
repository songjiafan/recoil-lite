import { Atom,  } from '../shared/types';
import { default as atom } from './atom';

export default function selector({ key, get: reducer }) {
  if (typeof reducer !== 'function') {
    throw TypeError('get must be function');
  }

  const result = reducer({
    get: (atom) => {
      return atom.getSnapShot();
    },
  });

  return atom({
    key,
    default: result,
  });
}
