import React from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from 'reactstrap';
import MutliFileModalDelete from './../Modals/MutliFileModalDelete';

const AcceptedFilesHeader = (props) => {
  return (
    <>
      <div className='tableBtns' >
        <Dropdown 
          isOpen={props.dropdownOpen} 
          toggle={props.fileFilterDropdowntoggle}
          style={{marginRight: 10}} 
        >
          <DropdownToggle color="white" className='bankButton' caret>{props.fileDropdownSelected}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => props.fileDropdownFilter('All Files')}>All Files</DropdownItem>
              <DropdownItem onClick={() =>props.fileDropdownFilter("PRE DUPE")}>Pre Dupe</DropdownItem>
              <DropdownItem onClick={() =>props.fileDropdownFilter('DE DUPED')}>De Duped</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Button 
          color='white'
          className='bankButton'
          active
          style={{marginRight: 10}} 
          onClick={(e) => {
            props.files.forEach(file => {
              if (props.selectAllChecked === false){
                props.addToSelectedFiles(file)
              } else {
                props.removeSelectedFiles(file)
              }
            })
          props.handleAllChecked(e)
        }}>
          Select All Files
        </Button>
        <MutliFileModalDelete 
          deleteAcceptedFiles={props.deleteAcceptedFiles} 
          updateAlertHandler={props.updateAlertHandler} 
          selectedFiles={props.selectedFiles} 
          fileHandler={props.fileHandler} 
        />
        <Button 
          color='white'
          className='bankButton' 
          style={{marginLeft: 10}} 
          onClick={(e) => props.filesDisplayedHandler()}
        >
          Show Rejected Files
        </Button>
      </div>
    </> 
  );
}

export default (AcceptedFilesHeader)
