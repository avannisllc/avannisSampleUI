import React from 'react';
import './../../../../App.css';
import Files from './../Modals/SampleFilesModal';
import MutliFileModalDelete from './../Modals/MutliFileModalDelete';
import SampleFilesHeader from './../SampleFiles/SampleFilesHeader';
import { Alert } from 'react-bootstrap'

class Table extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      selectAll: false,
      files: this.props.files,
      selectedFiles: [],
      acceptedFiles:this.props.files.sampleData,
      fileDropdownSelected:'All Files',
      dropdownOpen: false,
      tableUploadingFile: this.props.tableUploadingFile,
      tableDeletingFiles: this.props.tableDeletingFiles
    }
  }

  componentDidMount(){
    let tableInterval = setInterval(() => {
      try {
          document.getElementsByClassName('tab1')[0].scrollIntoView(true) 
          clearInterval(tableInterval)
      } catch {
      
      }
      
    }, 100)
    console.log(this.props.files, 'files')
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.tableDeletingFilesSuccess !== this.props.tableDeletingFilesSuccess){
      this.setState({
        tableDeletingFiles: false
      })
      setTimeout(()=> {
        document.getElementById('tableDeletingFilesSuccess').style.display = "none"
      }, 1000)
      return true
    } else if (this.props.tableUploadingFileSuccess !== prevProps.tableUploadingFileSuccess){
      this.setState({
        tableUploadingFile: false
      })
      setTimeout(()=> {
        document.getElementById('tableUploadingFileSuccess').style.display = "none"
      }, 500)
      return true
    } else if (this.props.tableDeletingFilesFailure !== prevProps.tableDeletingFilesFailure){
      this.setState({
        tableUploadingFile: false
      })
      setTimeout(()=> {
        document.getElementById('tableDeletingFilesFailure').style.display = "none"
      }, 1000)
      return true
    } else if (this.props.tableUploadingFileFailure !== prevProps.tableUploadingFileFailure){
      this.setState({
        tableUploadingFile: false
      })
      setTimeout(()=> {
        document.getElementById('tableUploadingFileFailure').style.display = "none"
      }, 1000)
      return true
    } else if (this.props.displayAcceptedFiles !== prevProps.displayAcceptedFiles) {
      this.setState({
        selectedFiles: []
      })
      return true
    } else {
      return false
    }
  }

  async updateAlertHandler(type){
    if (type === 'delete'){
      this.setState({
        tableDeletingFiles: true
      })
    }
    if (type === 'upload'){
      this.setState({
        tableUploadingFile: true
      })
    }
  }

  removeSelectedFiles(e){
    let selectedFiles = this.state.selectedFiles;
    let isFound = false
    let newSelectedFiles = []
    selectedFiles.forEach(fileArr => {
      if (fileArr === e){
        isFound = true
      } else {
        newSelectedFiles.push(fileArr)
      }
    })
    if (isFound){
      selectedFiles.push(e)
      this.setState({
        selectedFiles: newSelectedFiles
      })
    }
  }
  addToSelectedFiles(e){
    let selectedFiles = this.state.selectedFiles;
    let isFound = false
    selectedFiles.forEach(fileArr => {
      if (fileArr === e){
        isFound = true
      }
    })
    if (!isFound){
      selectedFiles.push(e)
      this.setState({
        selectedFiles: selectedFiles
      })
    }
  }
  
  // Need to add a function to filter the files by the drop down menu

  fileFilterDropdowntoggle(){
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  } 

  fileDropdownFilter(selectedDropdownOption){
    if(selectedDropdownOption === 'All Files'){
      this.setState({
        acceptedFiles: this.props.files.sampleData,
        fileDropdownSelected: selectedDropdownOption
      })
    }else{
      let newArray = this.props.files.sampleData.filter(file => file.stage.toLowerCase() === selectedDropdownOption.toLowerCase())
      this.setState({
        acceptedFiles: newArray,
        fileDropdownSelected: selectedDropdownOption
      })
    }
  }


  // Need to add a lambda function that takes the selected files and runs the dupe file scrubber

  render (
    {acceptedFiles, selectedFiles, dropdownOpen, fileDropdownSelected, tableDeletingFiles, tableUploadingFile}=this.state
  ) {
    return (
      <div style={{width: '100%', display: 'inline'}}> 
          <SampleFilesHeader 
            addToSelectedFiles={this.addToSelectedFiles.bind(this)} 
            deleteAcceptedFiles={this.props.deleteAcceptedFiles} 
            files={this.props.files.items.accepted} 
            filesDisplayedHandler={this.props.filesDisplayedHandler} 
            fileHandler={this.props.fileHandler} 
            handleAllChecked={this.props.handleAllChecked}  
            removeSelectedFiles={this.removeSelectedFiles.bind(this)}  
            selectedFiles={selectedFiles} 
            updateAlertHandler={this.updateAlertHandler.bind(this)}
            fileDropdownFilter={this.fileDropdownFilter.bind(this)}
            fileDropdownSelected={fileDropdownSelected}
            fileFilterDropdowntoggle={this.fileFilterDropdowntoggle.bind(this)}
            dropdownOpen={dropdownOpen}
          />

        <Alert 
          className='tableDeletingFiles' 
          id='tableDeletingFiles' 
          show={tableDeletingFiles} 
          variant="warning"
        > 
          Your files are being deleted! 
        </Alert>

        <Alert 
          className='tableDeletingFiles' 
          id='tableDeletingFilesSuccess' 
          show={this.props.tableDeletingFilesSuccess} 
          variant="success"
        > 
          Your files have successfully be deleted! 
        </Alert>

        <Alert 
          className='tableDeletingFiles' 
          id='tableDeletingFilesFailure' 
          show={this.props.tableDeletingFilesFailure} 
          variant="danger"
        > 
          Your files did not delete. Please review file format. 
        </Alert>

        <Alert 
          className='tableUploadingFile' 
          id='tableUploadingFile' 
          show={tableUploadingFile} 
          variant="warning"
        > 
          Your file is uploading! 
        </Alert>

        <Alert 
          className='tableUploadingFile' 
          id='tableUploadingFileSuccess' 
          show={this.props.tableUploadingFileSuccess} 
          variant="success"
        > 
          Your file has successfully uploaded! 
        </Alert>

        <Alert 
          className='tableUploadingFile' 
          id='tableUploadingFileFailure' 
          show={this.props.tableUploadingFileFailure} 
          variant="danger"
        > 
          Your file did not upload. Please review formatting. 
        </Alert>

        <table id="table" style={{width: 'inherit', display: 'inline-table'}}>
          <tr style={{display: 'table-header-group', height: '65px'}}>
            <th style={{width: '10%', textAlign: 'center'}}>Select</th>
            <th style={{width: '51%', textAlign: 'justify', textIndent: 10}}>File Name</th> 
            <th style={{width: '12%', textAlign: 'center'}}>Processed Date</th>
            <th style={{width: '12%', textAlign: 'center'}}>De_Duped Date</th>
            <th style={{width: '12%', textAlign: 'center'}}>Stage</th>
            <th style={{textAlign: 'center', width: '15%'}} >File Options</th>
          </tr>

        {/* Mapping through the accepted files and passing them as props*/}
        {acceptedFiles.map((file, index) =>
          <div 
            key={index}
            style={{
              display: 'table-row-group',
              marginBottom: 10,
              marginLeft: 10,
              width: '100%' 
            }} 
          >
            <Files 
              addToSelectedFiles={this.addToSelectedFiles.bind(this)}
              allFileSelectHandler={this.props.allFileSelectHandler} 
              allCheckedSetState={this.props.allCheckedSetState} 
              bank={this.props.bank} 
              clickedOutside={this.props.clickedOutside}
              data={this.props.data}
              deleteAcceptedFiles={this.props.deleteAcceptedFiles}
              displayAcceptedFiles={this.props.displayAcceptedFiles}
              file={file} 
              fileHandler={this.props.fileHandler}
              fileSelectHandler={this.props.fileSelectHandler} 
              handleButtonClick={this.props.handleButtonClick} 
              handleClickOutside={this.props.handleClickOutside} 
              handleAllChecked={this.props.handleAllChecked} 
              open={this.props.open} 
              refreshFileLocation={this.props.refreshFileLocation}
              phoneScrubHandler={this.props.phoneScrubHandler} 
              removeSelectedFiles={this.removeSelectedFiles.bind(this)}
              selectAllChecked={this.props.selectAllChecked} 
              updateAlertHandler={this.updateAlertHandler.bind(this)} 
            />
          </div>  
        )}
      </table>
    </div>
  )}
}

export default (Table); 