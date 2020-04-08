import React, { useState, Fragment } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { editUrl } from '../actions/index';
import {
  returnAllowedPositions,
  allowedWidths,
  validateForm,
  returnErrorField
} from '../utils/modalUtils';
import '../style/style.css';

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

  const onSubmit = async () => {
    const valid = validateForm(url, position, width, height)[0];
    if (valid) {
      const data = {
        id,
        url,
        url_position: position,
        url_width: width,
        url_height: height
      };
      props.modalClose();
      dispatch(editUrl(data));
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
          {!error ? 'Update url' : <h2 className='error'>{error}</h2>}
        </Modal.Header>
        <Modal.Content>{activateForm()}</Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default EditModal;
