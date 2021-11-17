import BaseStateItem from './baseStateItem';
import { SelectorOptions, Atom, ItemType, AtomValue } from '../shared/types';
import invariant from '../kit/invariant';
import { store } from './store';

export default function selector(options: SelectorOptions) {
  const { key, get: reducer } = options;

  invariant(typeof reducer === 'function', 'get must be function');
  invariant(key, 'key options is necessary');
  const depSet = new Set();

  let result: any;

  updateResult();

  function updateResult() {
    // 如果依赖更新
    result = reducer({
      get: (atom: Atom) => {
        const atomKey = atom.getKey();
        if (!depSet.has(atomKey)) {
          depSet.add(atom.getKey()); // 添加局部依赖集合
        }
  
        return atom.getSnapShot();
      },
    });
  }

  const instance = new BaseStateItem({
    key,
    value: result,
    type: ItemType.selector,
  });

  store.registerEvent(instance);
  store.subscribe(([atomKey]) => {
    if (depSet.has(atomKey)) {
      updateResult();
      instance.update(result);
    }
  });

  return instance;
}
