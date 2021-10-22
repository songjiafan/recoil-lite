import { useRecoilValue } from './useRecoilValue';
import { useSetRecoilState } from './useSetRecoilState';
import { Atom } from '../shared/types';

export function useRecoilState<T extends Atom>(atom: T) {
  // if (__DEV__) {
  //   validateRecoilValue
  // }
  const state = useRecoilValue(atom);
  const setState = useSetRecoilState(atom);

  return [state, setState];
}