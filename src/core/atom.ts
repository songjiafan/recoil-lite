import BaseStateItem from './baseStateItem';
import invariant from '../kit/invariant';
import { store } from './store';
import { Atom, AtomOptions, ItemType } from '../shared/types';

export default function atom(options: AtomOptions) {
  const { key, default: value } = options;

  invariant(key, 'key options is necessary');

  const instance = new BaseStateItem({
    key,
    value,
    type: ItemType.atom,
  }); // 初始atom

  store.registerEvent(instance); // 注册事件
  store.registerDependence(instance); // 注册依赖

  return instance;
}
