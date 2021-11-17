import EventEmitter from 'events';
import { EventCallBack, AtomValue, AtomKey } from '../shared/types';

interface InterceptorMap {
  publishInterceptor?: Function;
  subscribeInterceptor?: Function;
  unSubscribeInterceptor?: Function;
}

export const createEventListener = (eventEmitter: EventEmitter, key: AtomKey, interceptorMap: InterceptorMap = {}) => {
  return {
    publish: (value: AtomValue) => {
      eventEmitter.emit(key, value);
      interceptorMap.publishInterceptor && interceptorMap.publishInterceptor(value);
    },
    subscribe: (fn: EventCallBack) => {
      eventEmitter.on(key, fn);
      interceptorMap.subscribeInterceptor && interceptorMap.subscribeInterceptor(fn);
    },
    unSubscribe: (fn: EventCallBack) => {
      eventEmitter.removeListener(key, fn);
      interceptorMap.unSubscribeInterceptor && interceptorMap.unSubscribeInterceptor(fn);
    },
  };
}