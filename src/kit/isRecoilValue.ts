import BaseAtom from '../core/base';

export default function isRecoilValue(x: BaseAtom): boolean {
  return x instanceof BaseAtom;
}
