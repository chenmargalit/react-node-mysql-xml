import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import urlsReducer from './urlsReducer';

export default combineReducers({
  urls: urlsReducer,
  errors: errorsReducer
});
