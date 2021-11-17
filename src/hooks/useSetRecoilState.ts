import { useCallback } from 'react';
import invariant from '../kit/invariant';
import { Atom, ItemType } from '../shared/types';

// 只读
export const useSetRecoilState = <T extends Atom>(atom: T) => {
  return useCallback(setter => {
    invariant(atom.getType() !== ItemType.selector, 'selector is read only');

    return atom.update(setter);
  }, [atom]);
};