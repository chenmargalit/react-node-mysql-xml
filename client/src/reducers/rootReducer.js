import { FETCH_DATA, STORE_UPDATED } from '../actions/types';

const rootReducer = (
  state = {
    urls: [],
    updated: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        urls: action.payload
      };
    case STORE_UPDATED:
      console.log('redux store has been updated', state);
      return {
        ...state,
        updated: !state.updated
      };
    default:
      return state;
  }
};

export default rootReducer;
