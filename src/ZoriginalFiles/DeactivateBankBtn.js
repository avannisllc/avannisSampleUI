import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; 

const DeleteBankBtn = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id='bankButtonGlobal'  onClick={handleShow}>
        Deactivate Bank
      </Button>

      <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
        <Modal.Header >
          <Modal.Title >Deactivate Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{fontWeight: "600"}}>Are you sure you would like to deactivate this bank?</p>
          <p>{props.bank[0].formatted_name}</p>
        </Modal.Body>
        <Modal.Footer style={{textAlign: 'center'}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="deactivateBankConfirm"  style={{backgroundColor: '#233d4f'}} onClick={(e) => {handleClose(); props.deactivateBank(props.bank[0].name)}}>
            Deactivate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default (DeleteBankBtn)