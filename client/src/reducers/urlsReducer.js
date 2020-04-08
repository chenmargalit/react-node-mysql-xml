import { FETCH_DATA, STORE_EDITED } from '../actions/types';
const initializeState = { urls: [], updated: 0, successMessage: '' };

const urlsReducer = (state = initializeState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        urls: action.payload
      };
    case STORE_EDITED:
      console.log('store edited');
      return {
        ...state,
        updated: state.updated + 1,
        successMessage: 'Success !'
      };

    default:
      return state;
  }
};

export default urlsReducer;
