import {
  NOT_FOUND_ERROR,
  NOT_AUTHORIZED_ERROR,
  INVALID_ROUTE_URL,
  SERVER_DB_CONNECTION_ERROR,
  VALIDATION_ERROR
} from '../actions/types';

const errorsReducer = (state = { errors: '' }, action) => {
  switch (action.type) {
    case NOT_FOUND_ERROR:
      return {
        ...state,
        errors: 'Code 404: incorrect route'
      };
    case NOT_AUTHORIZED_ERROR:
      return {
        ...state,
        errors: 'You are unauthorized to do that'
      };
    case INVALID_ROUTE_URL:
      return {
        ...state,
        errors: 'Route url is incorrect'
      };
    case SERVER_DB_CONNECTION_ERROR:
      return {
        ...state,
        errors: 'Problem with fetching data from database'
      };
    case VALIDATION_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default errorsReducer;
