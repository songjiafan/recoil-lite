import { useRecoilValue } from './useRecoilValue';
import { useSetRecoilState } from './useSetRecoilState';
import { Atom } from '../shared/types';

export function useRecoilState<T extends Atom>(atom: T) {
  const state = useRecoilValue(atom);
  const setState = useSetRecoilState(atom);

  return [state, setState];
}