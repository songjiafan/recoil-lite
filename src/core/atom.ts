import BaseAtom from './base';
import { Atom } from '../shared/types';

// export class RecoilCenter {
//   store = new Set();

//   add(atom) {
//     this.store.add()
//   }
// }

const recoilStore = new Map<string, any>();

export default function atom({ key, default: value }) {
  const instance = BaseAtom.of(value);
  recoilStore.set(key, instance);
  return instance;
}
