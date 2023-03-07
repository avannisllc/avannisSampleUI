import React, {useState } from 'react'; 
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


const MutliFileDeDupModal = (props) => {
   const [show, setShow] = useState(false);
   const [preDupFiles, setPreDupFiles] = useState([]);
   const [deDupedFiles, setDeDupedFiles] = useState([]);
   const [countPreDupFiles, setCountPreDupFiles] = useState(0);
   const [countDeDupedFiles, setCountDeDupedFiles] = useState(0);

   const count = (files) =>{
      if(files.length)
         return files.length;
      else{
         var length = 0;
         for ( var p in files ){if(files.hasOwnProperty(p)) length++;};
         return length;
      }
   }

   const checkFiles = (files) => {
      if(files.length){
         let preDupFiles = []
         let deDupedFiles = []
         for (var i = 0; i < files.length; i++) {
            if (files[i].stage === 'DE DUPED'){
               deDupedFiles.push(files[i])
            }else{
               preDupFiles.push(files[i])
            }
         }
         setPreDupFiles(preDupFiles)
         setDeDupedFiles(deDupedFiles)
         setTimeout(() => {
            if(preDupFiles.length){
               let results = count(preDupFiles)
               setCountPreDupFiles(results)
            }
            if(deDupedFiles.length){
               let dupResults = count(deDupedFiles)
               setCountDeDupedFiles(dupResults)
            }
         }, 500)
      }else{
         console.log('no files selected');
      }
      return
   }

   const handleClose = () => {
      setShow(false);
   }
      
   const handleShow = () =>{
      checkFiles(props.selectedFiles)
      setShow(true);
   }

   return (
      <>
      <Button 
         color='white'
         className='bankButton' 
         onClick={handleShow}
         style={{marginLeft: 10}}
      >
         De-Dup Selected Files
      </Button>
      {/* {!props.selectedFiles[0] && 
         <Modal 
            style={{textAlign: 'center'}} 
            aria-labelledby="contained-modal-title-vcenter" 
            show={show} 
            onHide={handleClose} 
            centered
         >
            <Modal.Header >
            <Modal.Title >De-Dup Selected Files</Modal.Title>
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
      } */}
      {/* {props.selectedFiles[0] && 
         <Modal style={{textAlign: 'center'}} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} centered>
            <Modal.Header >
               <Modal.Title >De-Dup Selected Files</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div>
                  {preDupFiles.length? 
                     <div>
                        <p style={{fontWeight: "600"}}>Would you like to De-Dup the following {countPreDupFiles} file(s)?</p>
                        {preDupFiles.map(file => {
                           return <p key={file.name}>{file.name}</p>
                        })} 

                     </div>
                  :""}
                  {deDupedFiles.length?
                     <div>
                        <p style={{fontWeight: "600"}}>The following {countDeDupedFiles} file(s) have already been De-Duped:</p>
                        {deDupedFiles.map(file => {
                           return <p key={file.name}>{file.name}</p>
                        })}
                     </div>
                  :""}
               </div>
            </Modal.Body>
            <Modal.Footer style={{textAlign: 'center'}}>
               <Button variant="secondary" onClick={handleClose}>
               Close
               </Button>
               <Button className="deleteFileConfirm" style={{backgroundColor: '#233d4f'}} onClick={(e) => {
                  // try {
                  //    if (props.props.selectedFiles[0].delete_file_log || props.props.selectedFiles[0].cloudwatch_log){
                  //    props.fileHandler(props.selectedFiles, 'delete')
                  //    }
                  // } catch {
                  //    props.deleteAcceptedFiles(props.selectedFiles, 'delete')
                  // }
                  // props.updateAlertHandler('delete')
                  handleClose()
                  }}>
                  De_Dupe
               </Button>
            </Modal.Footer>
         </Modal>
      }
      {!props.selectedFiles[0] && 
         <Modal 
            style={{textAlign: 'center'}} 
            aria-labelledby="contained-modal-title-vcenter" 
            show={show} 
            onHide={handleClose} 
            centered
         >
            <Modal.Header >
            <Modal.Title >De-Dup Selected Files</Modal.Title>
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
      } */}
      {!props.selectedFiles[0] && 
         <Modal 
            isOpen={show}
            style={{textAlign: 'center'}} 
         >
            <ModalHeader 
               style={{fontWeight: "600"}}
               close={handleClose}
            >
               De-Dup Selected Files
            </ModalHeader>
            <ModalBody>
               <div>
                  <p style={{fontWeight: "600"}}>No files selected!</p>
               </div>
            </ModalBody>
            <ModalFooter style={{textAlign: 'center'}}>
               <Button variant="secondary" onClick={handleClose}>
               Close
               </Button>
            </ModalFooter>
         </Modal>
      }
      {props.selectedFiles[0] && 
         <Modal 
            isOpen={show}
            style={{textAlign: 'center'}} 
            className="fileModal"
         >
            <ModalHeader 
               close={handleClose}
               className="modalHeader"
               style={{fontWeight: "600"}}
            >
               De-Dup Selected Files
            </ModalHeader>
            <ModalBody>
               <div>
                  {preDupFiles.length? 
                     <div>
                        <p style={{fontWeight: "600"}}>
                           Would you like to De-Dup the following {countPreDupFiles} file(s)?
                        </p>
                        {preDupFiles.map(file => {
                           return <p key={file.name}>{file.name}</p>
                        })} 
                     </div>
                  :""}
                  {deDupedFiles.length?
                     <div>
                        <p style={{fontWeight: "600"}}>
                           The following {countDeDupedFiles} file(s) have already been De-Duped:
                        </p>
                        {deDupedFiles.map(file => {
                           return <p key={file.name}>{file.name}</p>
                        })}
                     </div>
                  :""}
               </div>
            </ModalBody>
            <ModalFooter style={{textAlign: 'center'}}>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button className="deleteFileConfirm" style={{backgroundColor: '#233d4f'}} onClick={(e) => {
                   // try {
                  //    if (props.props.selectedFiles[0].delete_file_log || props.props.selectedFiles[0].cloudwatch_log){
                  //    props.fileHandler(props.selectedFiles, 'delete')
                  //    }
                  // } catch {
                  //    props.deleteAcceptedFiles(props.selectedFiles, 'delete')
                  // }
                  // props.updateAlertHandler('delete')
                  console.log(preDupFiles, 'preDupFiles')
                  handleClose()
                  }}>
                  De_Dupe
               </Button>
            </ModalFooter>
         </Modal>
      }
      </> 
   );
}

export default (MutliFileDeDupModal)
