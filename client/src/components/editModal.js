import React, { useState, Fragment } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { STORE_UPDATED } from '../actions/types';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';
import {
  returnAllowedPositions,
  allowedWidths,
  validationOrder,
  validateForm
} from '../utils/modalUtils';

const EditModal = props => {
  const [id] = useState(props.chosen_item.id);
  const [url, setUrl] = useState(props.chosen_item.url);
  const [position, setPosition] = useState(props.chosen_item.position || '');
  const [width, setWidth] = useState(props.chosen_item.width || 0);
  const [height, setHeight] = useState(props.chosen_item.height || 0);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const activateForm = () => (
    <Form>
      <Form.Input
        required
        fluid
        label='url'
        placeholder='url with protocol (http/https)'
        name='url'
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <Form.Input
        fluid
        label='position'
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
        Update
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
        id,
        url,
        position,
        width,
        height
      };

      try {
        // token sent to the server for verification. Passes through verifyToken middleware
        const token = Cookie.get('token');
        await axios.patch('http://localhost:5000/edit_url', [token, data]);
        // notify useEffect in main.js that store has been updated and it should re-render
        dispatch({ type: STORE_UPDATED });
        props.modalClose();
      } catch (err) {
        if (err.response.status === 401) {
          setError('unauthorized');
        } else if (err.response.status === 500) {
          setError(err.response.data);
        } else {
          setError('problem with editing data, please try again');
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
          {!error ? 'Update url' : <h2 style={{ color: 'red' }}>{error}</h2>}
        </Modal.Header>
        <Modal.Content>{activateForm()}</Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default EditModal;
