import { isRecoilValue } from '../kit';

export function validateRecoilValue(recoilValue, hookName) {
  if (!isRecoilValue(recoilValue)) {
    throw SyntaxError(
      `Invalid argument to ${hookName}: expected an atom or selector but got ${String(
        recoilValue,
      )}`,
    );
  }
}