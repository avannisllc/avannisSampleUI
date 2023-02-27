import React from 'react';
import FileDropdown from './../FileDropdown';


const AcceptedFiles = (props) => {
  return (
    <>
      <tr style={{width: '100%'}}>
        <td value={props.file.id} style={{textAlign: 'center', verticalAlign: 'middle'}}>
        {/* <div style={{display: 'contents'}}> */}
          <input 
          checked={props.checked} 
          onChange={(e) => {
            if (!props.checked){
              props.addToSelectedFiles(props.file)
            } else {
              props.removeSelectedFiles(props.file)
            }
            // props.fileSelectHandler(e, isChecked)
            props.setCheckedState()
            }}
          type="checkbox" 
          value={props.file.id} 
          name={props.file.name}
          class='fileDropdown' 
          />
        </td>
        <td
          className='fileNameTable'
          style={{textAlign: 'justify', verticalAlign: 'middle', textIndent: 10}}
          onClick={(e) => {
            let file = props.file
            file.id = e.target.previousSibling.attributes[0].value
            props.allFileSelectHandler(file, props.selectAllChecked, true)
            if (!props.checked){
              props.addToSelectedFiles(props.file)
            } else {
              props.removeSelectedFiles(props.file)
            }
            // props.fileSelectHandler(e, isChecked)
            props.setCheckedState()
            }}>
            {props.file.name}
        </td>
        <td style={{textAlign: 'center', verticalAlign: 'middle', textTransform: 'uppercase'}}>
            {props.file.processed_date}
        </td>
        <td style={{textAlign: 'center', verticalAlign: 'middle', textTransform: 'uppercase'}}>
            <div  style={{verticleAlign: "middle"}}>
            {props.file.name === "No files available" &&
              <span>N/A</span>
            }
            {props.file.name !== "No files available" &&
              <span>Accepted</span>
            }
            </div>
        </td>
        <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
          <FileDropdown 
            deleteAcceptedFiles={props.deleteAcceptedFiles}
            updateAlertHandler={props.updateAlertHandler} 
            fileHandler={props.fileHandler}
            refreshFileLocation={props.refreshFileLocation}
            phoneScrubHandler={props.phoneScrubHandler} 
            handleButtonClick={props.handleButtonClick} 
            clickedOutside={props.clickedOutside} 
            handleClickOutside={props.handleClickOutside} 
            open={props.open} file={props.file} bank={props.bank}
          />
        </td>
        </tr>
    </> 
  );
}

export default (AcceptedFiles)
