import React, { useEffect, useReducer } from 'react';
import { useReadCount } from '../hooks';
import { TitleBar } from './TitleBar';
import { CampaingsList } from './CampaingsList';
import {CountContext } from './Context';

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'set':
      return {count: action.count};
    default:
      throw new Error();
  }
}

export function Campaings() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { value, error } = useReadCount();

  useEffect(() => {
    if (value && value.length > 0 && value[0]._hex && state.count <= 0) {
      dispatch({type: 'set', count: parseInt(value[0]._hex, 16)})
    }
  }, [value, error, state])


  return (
    <div>
      <CountContext.Provider value={dispatch} >
        <TitleBar title="Campaings" />
        <p>Count: {state.count}</p>
        {state.count > -1 && <CampaingsList count={state.count} />}
      </CountContext.Provider>
    </div>
  )
}