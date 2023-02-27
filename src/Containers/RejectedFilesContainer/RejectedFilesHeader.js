import React from 'react';
import MutliFileModalDelete from './MutliFileModalDelete';

const RejectedFilesHeader = (props) => {
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
        <button className='bankButton' style={{marginRight: 10}} onClick={(e)=> {document.getElementById('getFile').click()}}>Upload File</button>
          <input type='file' id="getFile" style={{display:'none'}} onInput={(e) => {
            console.log(e)
            props.updateAlertHandler('upload')
            let name = e.target.files["0"].name
            props.fileHandler(name.slice(0, name.indexOf('.')), 'upload', e.target.value)}}></input>
        <MutliFileModalDelete deleteAcceptedFiles={props.deleteAcceptedFiles} updateAlertHandler={props.updateAlertHandler} selectedFiles={props.selectedFiles} fileHandler={props.fileHandler} />
        <button className='bankButton' style={{marginLeft: 10}} onClick={(e) => props.filesDisplayedHandler()}>Show Accepted Files</button>
      </div>
    </> 
  );
}

export default (RejectedFilesHeader)
