import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; 

const FileModalDelete = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button id='dropdownBtnDelete' onClick={handleShow} className="dropdownBtn">Delete File</button>
      <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
        <Modal.Header >
          <Modal.Title >Delete Files</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <p style={{fontWeight: "600"}}>Would you like to delete the following file?</p>
            <p>{props.file.name}</p>
          </Modal.Body>
        <Modal.Footer style={{textAlign: 'center'}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="deleteFileConfirm" style={{backgroundColor: '#233d4f'}} onClick={(e) => {
            // console.log(e)
            try {
              if (props.file.delete_log_file){
                props.fileHandler(props.file, 'delete')
              } else {
                props.deleteAcceptedFiles(props.file)
              }
            } catch {
              props.deleteAcceptedFiles(props.file)
            }
            props.updateAlertHandler('delete')
            handleClose()
            // props.fileHandler()
            }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  );
}

export default (FileModalDelete)
