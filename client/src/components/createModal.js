import React, { useState, Fragment } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createUrl } from '../actions/index';
import {
  returnAllowedPositions,
  allowedWidths,
  validateForm,
  returnErrorField
} from '../utils/modalUtils';
import '../style/style.css';

const CreateModal = props => {
  const dispatch = useDispatch();

  const [url, setUrl] = useState('https://google.com');
  const [position, setPosition] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

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

  const onSubmit = e => {
    const valid = validateForm(url, position, width, height)[0];

    if (valid) {
      const data = {
        vast_url: url,
        url_position: position,
        url_height: height,
        url_width: width
      };
      props.modalClose();
      dispatch(createUrl(data));
    } else {
      const errorField = returnErrorField(url, position, width, height);
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
          {error ? <h3 className='error'>{error}</h3> : <h1>Create the url</h1>}
        </Modal.Header>
        <Modal.Content>{activateForm()}</Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default CreateModal;
