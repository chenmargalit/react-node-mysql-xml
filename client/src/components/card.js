import React, { Fragment, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import EditModal from './editModal';

const DataTable = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({
    id: '',
    url: '',
    position: '',
    width: 0,
    height: 0
  });

  const editUrl = (id, url, position, width, height) => {
    // id in db starts from 1, in the state array it starts from 0
    setData({ id, url, position, width, height });
    setModalOpen(true);
  };

  return (
    <Fragment>
      <Table color={'green'} key={'white'} inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>URL</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Width</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>EDIT</Table.HeaderCell>
            <Table.HeaderCell>XML</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {props.data.map((url, index) => {
          // urls might be very long , so only present the first 20 chars
          const modifiedUrl =
            url.vast_url.length > 20
              ? url.vast_url.substr(0, 20)
              : url.vast_url;
          return (
            <Fragment key={url.id}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{url.id}</Table.Cell>
                  <Table.Cell>{modifiedUrl + '...'}</Table.Cell>
                  <Table.Cell>{url.position}</Table.Cell>
                  <Table.Cell>{url.width}</Table.Cell>
                  <Table.Cell>{url.height}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color='olive'
                      onClick={() =>
                        editUrl(
                          url.id,
                          url.vast_url,
                          url.position,
                          url.width,
                          url.height
                        )
                      }
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button color='olive'>
                      <a
                        style={{
                          textDecoration: 'none',
                          color: 'white'
                        }}
                        rel='noopener noreferrer'
                        target='_blank'
                        href={`http://localhost:5000/show_xml?id=${url.id}`}
                      >
                        Open XML
                      </a>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Fragment>
          );
        })}
        {modalOpen && (
          <EditModal
            modalOpen={modalOpen}
            modalClose={() => setModalOpen(false)}
            chosen_item={data}
          />
        )}
      </Table>
    </Fragment>
  );
};

export default DataTable;
