import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataCard from './card';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_DATA } from '../actions/types';
import { Button } from 'semantic-ui-react';
import CreateModal from './createModal';
import { createJwt } from '../jsonWebToken/utilJWT';
import Cookie from 'js-cookie';

function Main() {
  // set a cookie named token using the jsonwebtoken package
  Cookie.set('token', createJwt());
  const dispatch = useDispatch();
  const reduxStoreUrls = useSelector(state => state.urls);
  const reduxStoreUpdated = useSelector(state => state.updated);
  const [modal, setModal] = useState(false);
  const [urlsShown, setUrlsShown] = useState(false);
  const [error, setError] = useState('');

  // on start and every store update, fetch urls from db
  useEffect(() => {
    async function fetch_urls_from_db() {
      try {
        // token sent for verification, passes through verifyToken middleware
        const token = Cookie.get('token');
        const urls = await axios.post('http://localhost:5000/get_urls', {
          token
        });
        await dispatch({ type: FETCH_DATA, payload: urls.data });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // if there is a verification issue, this will be returned
          setError('unauthorized');
        } else {
          setError(
            'Problem with fetching urls from db, please refresh or re-run the server'
          );
        }
      }
    }
    fetch_urls_from_db();
  }, [dispatch, reduxStoreUpdated]);

  const handleModalOpen = () => {
    setModal(true);
  };

  // show all urls
  const showAll = () => {
    return <DataCard data={reduxStoreUrls} />;
  };

  // show only fhe first url as an example
  const showFirst = () => {
    return <DataCard data={[reduxStoreUrls[0]]} />;
  };
  // decide wether to show or hide all urls
  const showOrHideUrls = () => {
    urlsShown ? setUrlsShown(false) : setUrlsShown(true);
  };

  return (
    <div style={{ margin: 20 }}>
      <div>
        {error ? (
          <h3 style={{ color: 'red' }}>{error}</h3>
        ) : (
          <h1>Welcome to the cheq project</h1>
        )}
        <Button primary onClick={handleModalOpen}>
          createUrl
        </Button>
        <Button secondary floated={'right'} onClick={showOrHideUrls}>
          {urlsShown ? 'Hide urls' : 'Show urls'}
        </Button>
        {reduxStoreUrls.length > 0 && !urlsShown && showFirst()}
        {urlsShown && showAll()}
        {modal && (
          <CreateModal modalOpen={modal} modalClose={() => setModal(false)} />
        )}
      </div>
    </div>
  );
}

export default Main;

// const deleteAll = async () => {
//   const res = await axios.get('http://localhost:5000/delete');
//   console.log('res is', res);
// };

// {<Button onClick={deleteAll}>Delete</Button>}
