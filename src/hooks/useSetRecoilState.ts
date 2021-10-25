import { useCallback } from 'react';
import { Atom } from '../shared/types';

// 只读
export const useSetRecoilState = <T extends Atom>(atom: T) => {
  return useCallback(setter => atom.update(setter), [atom]);
};