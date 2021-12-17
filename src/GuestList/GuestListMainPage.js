import React, { useState } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderRsvpStats, createListOfGuests } from './utils';
import AddForm from './AddForm';
import PlumButton from '../Common/styled/buttonstyles/PlumButton';
import PlumFilledButton from '../Common/styled/buttonstyles/PlumFilledButton';
import { BAlexBrush36 } from '../Common/styled/textstyles/AlexBrush36';
import { BMerr18 } from '../Common/styled/textstyles/Merr18';
import { BMerr24 } from '../Common/styled/textstyles/Merr24';

const GuestListMainPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container fluid="md" className="header">
        <BAlexBrush36>Guest List</BAlexBrush36>
        <Container>
          <PlumFilledButton variant="primary" onClick={handleShow}>
            Add Guest
          </PlumFilledButton>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <BAlexBrush36 style={{ fontSize: '15px' }}>
                <Modal.Title>Add A Guest</Modal.Title>
              </BAlexBrush36>
            </Modal.Header>
            <Modal.Body>
              <AddForm />
            </Modal.Body>
            <Modal.Footer>
              <PlumButton variant="secondary" onClick={handleClose}>
                Close
              </PlumButton>
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>

      <Container fluid="md" className="high-level-rsvp-data">
        {renderRsvpStats()}
      </Container>

      <Container fluid="md" className="guest-list-table">
        <Table>
          <thead>
            <tr>
              <th>
                <BMerr18>Group</BMerr18>
              </th>
              <th>
                <BMerr18>Name</BMerr18>
              </th>
              <th>
                <BMerr18>Email</BMerr18>
              </th>
              <th>
                <BMerr18>RSVP Status</BMerr18>
              </th>
              <th>
                <BMerr18>Message</BMerr18>
              </th>
            </tr>
          </thead>
          <tbody>{createListOfGuests()}</tbody>
        </Table>
      </Container>
    </>
  );
};

export default GuestListMainPage;
