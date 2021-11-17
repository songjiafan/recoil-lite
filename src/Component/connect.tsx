import React, { useRef, useState, createElement } from 'react';
// import { atomEventsEmitter } from '../kit/subscription';

/**
 * @name connect hoc component
 * @param atomsMap 
 * @returns
 * 
 * @example
 * 
 * @connect({ testKey: atom1, testKey2: atom2 })
 * class Comp extends React.Component {
 *   render() {
 *     return <>{ this.props.testKey }{ this.props.testKey2 }</>
 *   }
 * }
 */
export default function connect(atomsMap = {}) {
  return (Component) => function RecoilLiteConnect(props) {
    const a = useRef()
    return <Component {...props} />
  }
}