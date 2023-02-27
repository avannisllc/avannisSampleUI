import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; 

const FileErrorModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
        <p id='fileLocationParaContainer' onClick={handleShow}>
          - <span id='fileLocationWError'>Error</span> -
        </p>
        <div>
          <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
          <Modal.Header >
            <Modal.Title >Error Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>{props.file.error}.</p>
          {props.file.cloudwatch_log &&
            <a href={props.file.cloudwatch_log} rel="noreferrer" target="_blank">Cloudwatch Log</a>
          }
          {!props.file.cloudwatch_log &&
            <div style={{display: "none"}}></div>
          }
          <br/>
          {props.file.delete_log_file && 
            <a href={props.file.delete_log_file} rel="noreferrer" target="_blank">Delete Log File</a>
          }
          {!props.file.delete_log_file && 
            <div style={{display: "none"}}></div>
          }
          </Modal.Body>
          <Modal.Footer style={{textAlign: 'center'}}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </Modal>
        </div>
    </>
  );
}

export default (FileErrorModal)
