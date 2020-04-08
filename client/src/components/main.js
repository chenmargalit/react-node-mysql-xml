import React, { useState, useEffect } from 'react';
import DataCard from './card';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import CreateModal from './createModal';
import { createJwt } from '../jsonWebToken/utilJWT';
import Cookie from 'js-cookie';
import { fetchUsers } from '../actions/index';
import '../style/style.css';

function Main() {
  // set a cookie named token using the jsonwebtoken package
  Cookie.set('token', createJwt());
  const dispatch = useDispatch();
  const reduxStore = useSelector(state => state.urls);
  const reduxErrors = useSelector(state => state.errors);
  const [modal, setModal] = useState(false);
  const [urlsShown, setUrlsShown] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, reduxStore.updated]);

  useEffect(() => {
    reduxStore.successMessage.length > 0 &&
      tempSuccessMessage(reduxStore.successMessage);
    reduxErrors.errors.length > 0 && setError(reduxErrors.errors);
  }, [reduxStore.updated, reduxStore.successMessage, reduxErrors]);

  const tempSuccessMessage = successMessage => {
    setSuccess(successMessage);
    setTimeout(() => {
      setSuccess('');
    }, 2000);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  // show all urls
  const showAll = () => {
    return <DataCard data={reduxStore.urls} />;
  };

  // show only fhe first url as an example
  const showFirst = () => {
    return <DataCard data={[reduxStore.urls[0]]} />;
  };
  // decide wether to show or hide all urls
  const showOrHideUrls = () => {
    urlsShown ? setUrlsShown(false) : setUrlsShown(true);
  };

  return (
    <div style={{ margin: 20 }}>
      <div>
        {error ? (
          <h3 className='error'>{error}</h3>
        ) : success ? (
          <h3 className='success'>{success}</h3>
        ) : (
          <h1>Welcome to the project</h1>
        )}
        <Button primary onClick={handleModalOpen}>
          createUrl
        </Button>
        <Button secondary floated={'right'} onClick={showOrHideUrls}>
          {urlsShown ? 'Hide urls' : 'Show urls'}
        </Button>
        {reduxStore.urls.length > 0 && !urlsShown && showFirst()}
        {urlsShown && showAll()}
        {modal && (
          <CreateModal modalOpen={modal} modalClose={() => setModal(false)} />
        )}
      </div>
    </div>
  );
}

export default Main;
