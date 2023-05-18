import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const initialState = {
  tours: {
    total: 20,
    items: [],
  },
};

const enhancer = devToolsEnhancer();

const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = createStore(rootReducer, enhancer);
