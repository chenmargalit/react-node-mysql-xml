import { FETCH_DATA, STORE_EDITED } from './types';
import axios from 'axios';
import Cookie from 'js-cookie';
import { errorTypeFunc } from '../utils/reduxErrorsHandler';

const token = Cookie.get('token');

export const fetchUsers = () => async dispatch => {
  try {
    const urls = await axios.post('http://localhost:5000/get_urls', { token });
    await dispatch({ type: FETCH_DATA, payload: urls.data });
  } catch (e) {
    // check what type of error has been returned and dispatch it to the store
    const errorType = errorTypeFunc(e.response.status);
    dispatch({ type: errorType });
  }
};

export const createUrl = data => async dispatch => {
  try {
    // token sent to the server for verification. Passes through verifyToken middleware
    await axios.post('http://localhost:5000/create_url', [token, data]);
    await dispatch({ type: STORE_EDITED });
  } catch (e) {
    console.log('problem with posting to db', e);
  }
};

export const editUrl = data => async dispatch => {
  try {
    // token sent to the server for verification. Passes through verifyToken middleware
    await axios.patch('http://localhost:5000/edit_url', [token, data]);
    // notify useEffect in main.js that store has been updated and it should re-render
    dispatch({ type: STORE_EDITED });
  } catch (e) {
    const errorType = errorTypeFunc(e.response.status);
    dispatch({ type: errorType });
  }
};
