import React from 'react';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from 'reactstrap';
import MutliFileModalDelete from './../Modals/MutliFileModalDelete';
import MutliFileDeDupModal from '../Modals/MultiFileDeDupeModal';


const SampleFilesHeader = (props) => {
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
            <DropdownItem onClick={() =>props.fileDropdownFilter('Pre Dupe')}>Pre Dupe</DropdownItem>
            <DropdownItem onClick={() =>props.fileDropdownFilter('De Duped')}>De Duped</DropdownItem>
            <DropdownItem onClick={() =>props.fileDropdownFilter('Rejected')}>Rejected</DropdownItem>
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

        <Dropdown 
          isOpen={props.daysDropdownOpen} 
          toggle={props.daysDropdowntoggle}
          style={{marginLeft: 10}} 
        >
          <DropdownToggle color="white" className='bankButton' caret>{props.daysForFiles} days </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => props.daysForFilesToBeDisplayed(1)}>1 day</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(2)}>2 days</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(3)}>3 days</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(4)}>4 days</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(5)}>5 days</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(6)}>6 days</DropdownItem>
            <DropdownItem onClick={() =>props.daysForFilesToBeDisplayed(7)}>7 days</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        {/* <Button 
          color='white'
          className='bankButton' 
          style={{marginLeft: 10}} 
          onClick={(e) => props.filesDisplayedHandler()}
        >
          Show Rejected Files
        </Button> */}
        {/* <Button
          color='white'
          className='bankButton'
          style={{marginLeft: 10}} 
        >
          De-Dupe Selected
        </Button> */}
        <MutliFileDeDupModal
          selectedFiles={props.selectedFiles} 
        />
      </div>
    </> 
  );
}

export default (SampleFilesHeader)
