import { useState, useEffect, useRef } from 'react';
import { Atom } from '../shared/types';

// 只读
export const useRecoilValue = <T extends Atom>(atom: T) => {
  const [state, update] = useState(atom.getSnapShot());
  const isSubscribed = useRef(false);

  if (!isSubscribed.current) {
    // recoil如果再useEffect中添加订阅，订阅的时机就在第一次effect之后了，那如果也在useEffect中setState，会导致更新失败，正常情况遇不到
    isSubscribed.current = true;
    atom.subscription.subscribe(update);
  }

  useEffect(() => {
    return () => atom.subscription.unSubscribe(update);
  }, []);

  return state;
};