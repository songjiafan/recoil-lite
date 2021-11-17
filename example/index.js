import React, { useEffect, useRef, useState } from 'react';
import { atom as recoilAtom, selector as recoilSelector, useRecoilState as useRecoilStateTrue, RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil-lite';

const a = recoilAtom({
  key: 'ccc',
  default: 123,
})

const b = recoilSelector({
  key: 'xxx',
  get: ({ get }) => {
    return get(a) * 10;
  }
})

const atomBase = atom({
  key: 'test',
  default: 1
});

const atomBase2 = atom({
  key: 'test2',
  default: 99
});

const selectorBase = selector({
  key: 'test selector',
  get: ({ get }) => {
    const num = get(atomBase);
    const num2 = get(atomBase2);
    return num + num2 * 10;
  }
});

const selectorAsync = selector({
  key: 'test selectorAsync',
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
  const [renderTimes, setRenderTimes] = useState(1);

  useEffect(() => {
    setRenderTimes(renderTimes + 1);
  }, [setState])

  return <>
    <h2>UseSetRecoilStateExample 只写</h2>
    <span>render次数 { renderTimes }</span>
    <button onClick={() => setState(state => state + 1)}>自增</button>
  </>
}

function SubscribeOne() {
  const atomCache = useRef(atomBase);
  const [state, setState] = useState(atomBase.getSnapShot());

  useEffect(() => {
    atomCache.current.getSubscription().subscribe(setState);

    return () => {
      atomCache.current.getSubscription().unSubscribe(setState);
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

function FaceBookRecoil() {
  const [v, setState] = useRecoilStateTrue(b);
  return <>
    <h2>facebook</h2>
    <div>数字: { v }</div>
    <button onClick={() => setState(v + 1)}>自增</button>
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
        <RecoilRoot>
          <FaceBookRecoil></FaceBookRecoil>
        </RecoilRoot>
      </>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('root'));