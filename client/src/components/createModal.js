import React, { useState, Fragment } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { STORE_UPDATED } from '../actions/types';
import {
  returnAllowedPositions,
  allowedWidths,
  validationOrder,
  validateForm
} from '../utils/modalUtils';
const Cookie = require('js-cookie');

const CreateModal = props => {
  const dispatch = useDispatch();

  const [url, setUrl] = useState('http://google.com');
  const [position, setPosition] = useState('top_left');
  const [width, setWidth] = useState(130);
  const [height, setHeight] = useState(130);
  const [error, setError] = useState('');

  const activateForm = () => (
    <Form>
      <Form.Input
        required
        fluid
        label='url'
        placeholder='url'
        name='url'
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <Form.Input
        fluid
        label={'Position'}
        placeholder={`accepted values: ` + returnAllowedPositions()}
        name='position'
        value={position}
        onChange={e => setPosition(e.target.value)}
      />
      <Form.Input
        fluid
        label='width'
        placeholder={allowedWidths}
        name='width'
        value={width}
        onChange={e => setWidth(e.target.value)}
      />
      <Form.Input
        fluid
        label='height'
        placeholder={allowedWidths}
        name='height'
        value={height}
        onChange={e => setHeight(e.target.value)}
      />
      <Button color='green' onClick={onSubmit} disabled={url.length < 1}>
        Submit
      </Button>
      <Button floated='right' color='red' onClick={props.modalClose}>
        Cancel
      </Button>
    </Form>
  );

  const onSubmit = async e => {
    const valid = validateForm(url, position, width, height)[0];

    if (valid) {
      const data = {
        vast_url: url,
        position,
        height,
        width
      };
      try {
        // token sent to the server for verification. Passes through verifyToken middleware
        const token = Cookie.get('token');
        await axios.post('http://localhost:5000/create_url', [token, data]);
        // notify useEffect in main.js that store has been updated and it should re-render
        dispatch({ type: STORE_UPDATED });
        props.modalClose();
      } catch (err) {
        if (err.response.status === 401) {
          setError('unauthorized');
        } else if (err.response.status === 500) {
          console.log(err.response);
          setError(err.response.data);
        } else {
          console.log(`problem with sending data on client side`, err);
          setError('problem with creating url');
        }
      }
    } else {
      // get the invalid field
      const validationArray = validateForm(url, position, width, height)[1];
      const errorIndex = validationArray.indexOf(false);
      const errorField = validationOrder[errorIndex];
      setError(`problem with form validation in ${errorField} field`);
    }
  };
  return (
    <Fragment>
      <Modal
        open={props.modalOpen}
        size='large'
        closeIcon
        onClose={props.modalClose}
      >
        <Modal.Header>
          {error ? (
            <h3 style={{ color: 'red' }}>{error}</h3>
          ) : (
            <h1>Create the url</h1>
          )}
        </Modal.Header>
        <Modal.Content>{activateForm()}</Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default CreateModal;
