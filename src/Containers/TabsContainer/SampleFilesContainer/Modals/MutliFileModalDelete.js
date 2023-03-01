import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'; 
import {Button} from 'reactstrap';

const MutliFileModalDelete = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button 
        color='white'
        className='bankButton' 
        onClick={handleShow}
      >
        Delete Selected Files
      </Button>
      {!props.selectedFiles[0] && 
        <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
          <Modal.Header >
            <Modal.Title >Delete Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p style={{fontWeight: "600"}}>No files selected!</p>
            </div>
          </Modal.Body>
          <Modal.Footer style={{textAlign: 'center'}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
      }
      {props.selectedFiles[0] && 
        <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
          <Modal.Header >
            <Modal.Title >Delete Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <p>Would you like to delete the following file(s)?</p>
            {props.selectedFiles.map(file => {
              return <p key={file.name}>{file.name}</p>
            })}
          </div>
          </Modal.Body>
          <Modal.Footer style={{textAlign: 'center'}}>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button className="deleteFileConfirm" style={{backgroundColor: '#233d4f'}} onClick={(e) => {
              try {
                if (props.props.selectedFiles[0].delete_file_log || props.props.selectedFiles[0].cloudwatch_log){
                  props.fileHandler(props.selectedFiles, 'delete')
                }
              } catch {
                props.deleteAcceptedFiles(props.selectedFiles, 'delete')
              }
              props.updateAlertHandler('delete')
              handleClose()
              }}>
            Delete
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </> 
  );
}

export default (MutliFileModalDelete)
