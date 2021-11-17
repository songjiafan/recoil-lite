import BaseAtom from '../core/baseStateItem';

export default function isRecoilValue(x: BaseAtom): boolean {
  return x instanceof BaseAtom;
}
