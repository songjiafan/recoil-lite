import React, { useRef, useState, createElement } from 'react';
import createSubscription from '../kit/subscription';

/**
 * 
 * @param atomsMap 
 * @returns
 * 
 * @example
 * 
 * @connect({ testKey: atom1, testKey2: atom2 })
 * class Comp extends React.Component
 */
export default function connect(atomsMap = {}) {
  return (Component) => class RecoilConnector extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {
      //   ...Object.entries(atomsMap).reduce((prev, [key, value]) => { prev[key] = value.getSnapShot(); return prev }, {});
      // }

      // this.subscription = createSubscription(...Object.values(atomsMap));
      // this.subscription.subscribe(value => {

      // })
    }

    

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}