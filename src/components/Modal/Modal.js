import React from "react";
import { Modal, Button } from "react-bootstrap";

const Notification = ({ show, handleClose, children, handleModalAction }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Token Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleModalAction} variant="danger">OK</Button>
        {/* <Button onClick={handleClose} variant="success">Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default Notification;
