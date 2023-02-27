import React from 'react';
import MutliFileModalDelete from './../Modals/MutliFileModalDelete';

const AcceptedFilesHeader = (props) => {
  return (
    <>
      <div className='tableBtns' >
      <button className='bankButton' style={{marginRight: 10}} onClick={(e) => {
          props.files.forEach(file => {
            if (props.selectAllChecked === false){
              props.addToSelectedFiles(file)
            } else {
              props.removeSelectedFiles(file)
            }
          })
          props.handleAllChecked(e)
        }}>Select All Files</button>
         <MutliFileModalDelete deleteAcceptedFiles={props.deleteAcceptedFiles} updateAlertHandler={props.updateAlertHandler} selectedFiles={props.selectedFiles} fileHandler={props.fileHandler} />
        <button className='bankButton' style={{marginLeft: 10}} onClick={(e) => props.filesDisplayedHandler()}>Show Rejected Files</button>
      </div>
    </> 
  );
}

export default (AcceptedFilesHeader)
