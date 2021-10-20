import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil-lite';

const atomBase = atom({
  key: 'test',
  default: 1
});

const selectorBase = selector({
  get: ({ get }) => {
    const num = get(atomBase);
    return num * 100;
  }
});

const selectorAsync = selector({
  get: async ({ get }) => {
    const promise = () => new Promise(resolve => {
      setTimeout(() => resolve(20), 5000)
    });
    const num = get(atomBase);
    const ratio = await promise();
    return num * ratio;
  }
});

function UseRecoilStateExample() {
  const [state, setState] = useRecoilState(atomBase);
  return <>
    <h2>useRecoilState</h2>
    <div>数字: { state }</div>
    <button onClick={() => setState(state + 1)}>自增</button>
  </>
}

function UseRecoilValueExample() {
  const state = useRecoilValue(atomBase);
  return <>
    <h2>UseRecoilValueExample 只读</h2>
    <div>数字: { state }</div>
  </>
}

function UseSetRecoilStateExample() {
  const setState = useSetRecoilState(atomBase);
  return <>
    <h2>UseSetRecoilStateExample 只写</h2>
    <button onClick={() => setState(state => state + 1)}>自增</button>
  </>
}

function SubscribeOne() {
  const subscription = useRef(atomBase);
  const [state, setState] = useState(atomBase.getSnapShot());

  useEffect(() => {
    subscription.current.subscribe(setState);

    return () => {
      subscription.current.unSubscribe(setState);
    }
  }, []);

  return <>
    <h2>Subscribe 监听</h2>
    <span>value:{ state }</span>
  </>
}

function Selector() {
  const [state, setState] = useRecoilState(selectorBase);
  return <>
    <h2>Selector</h2>
    <div>数字: { state }</div>
    <button onClick={() => setState(state + 1)}>自增</button>
  </>
}

function AsyncSelector() {
  const [state, setState] = useRecoilState(selectorBase);
  return <>
    <h2>AsyncSelector</h2>
    <div>数字: { state }</div>
    <button onClick={() => setState(state + 1)}>自增</button>
  </>
}

class Example extends React.Component {
  render() {
    return (
      <>
        <UseRecoilStateExample />
        <UseRecoilValueExample />
        <UseSetRecoilStateExample />
        <SubscribeOne />
        <Selector />
        <AsyncSelector />
      </>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));