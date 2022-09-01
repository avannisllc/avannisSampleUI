import React from 'react';
import './App.css';
import Files from './Files'
import MutliFileModalDelete from './MutliFileModalDelete';
import AcceptedFilesHeader from './AcceptedFilesHeader';
import RejectedFilesHeader from './RejectedFilesHeader';
import { Alert } from 'react-bootstrap'

class Table extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      selectAll: false,
      files: this.props.files,
      selectedFiles: [],
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
  

  render () {
    return (
      <div style={{width: '100%', display: 'inline'}}> 
        
        {!this.props.displayAcceptedFiles &&
          <RejectedFilesHeader updateAlertHandler={this.updateAlertHandler.bind(this)} selectedFiles={this.state.selectedFiles} deleteAcceptedFiles={this.props.deleteAcceptedFiles} fileHandler={this.props.fileHandler} filesDisplayedHandler={this.props.filesDisplayedHandler} files={this.props.files.items.rejected} addToSelectedFiles={this.addToSelectedFiles.bind(this)} removeSelectedFiles={this.removeSelectedFiles.bind(this)}  handleAllChecked={this.props.handleAllChecked} />
        }
        {this.props.displayAcceptedFiles &&
          <AcceptedFilesHeader updateAlertHandler={this.updateAlertHandler.bind(this)} selectedFiles={this.state.selectedFiles} deleteAcceptedFiles={this.props.deleteAcceptedFiles} fileHandler={this.props.fileHandler} filesDisplayedHandler={this.props.filesDisplayedHandler} files={this.props.files.items.accepted} addToSelectedFiles={this.addToSelectedFiles.bind(this)} removeSelectedFiles={this.removeSelectedFiles.bind(this)}  handleAllChecked={this.props.handleAllChecked}  />
        }
        <Alert className='tableDeletingFiles' id='tableDeletingFiles' show={this.state.tableDeletingFiles} variant="warning"> Your files are being deleted! </Alert>
        <Alert className='tableDeletingFiles' id='tableDeletingFilesSuccess' show={this.props.tableDeletingFilesSuccess} variant="success"> Your files have successfully be deleted! </Alert>
        <Alert className='tableDeletingFiles' id='tableDeletingFilesFailure' show={this.props.tableDeletingFilesFailure} variant="danger"> Your files did not delete. Please review file format. </Alert>
        <Alert className='tableUploadingFile' id='tableUploadingFile' show={this.state.tableUploadingFile} variant="warning"> Your file is uploading! </Alert>
        <Alert className='tableUploadingFile' id='tableUploadingFileSuccess' show={this.props.tableUploadingFileSuccess} variant="success"> Your file has successfully uploaded! </Alert>
        <Alert className='tableUploadingFile' id='tableUploadingFileFailure' show={this.props.tableUploadingFileFailure} variant="danger"> Your file did not upload. Please review formatting. </Alert>
        <table id="table" style={{width: 'inherit', display: 'inline-table'}}>
        {!this.props.displayAcceptedFiles &&
          <tr style={{display: 'table-header-group', height: '65px'}}>
            <th style={{width: '10%', textAlign: 'center'}}>Select</th>
            <th style={{width: '60%', textAlign: 'justify', textIndent: 10}}>File Name</th> 
            <th style={{width: '15%', textAlign: 'center'}}>Location</th>
            <th style={{textAlign: 'center', width: '15%'}} >File Options</th>
          </tr>
        }
        {this.props.displayAcceptedFiles &&
          <tr style={{display: 'table-header-group', height: '65px'}}>
            <th style={{width: '10%', textAlign: 'center'}}>Select</th>
            <th style={{width: '51%', textAlign: 'justify', textIndent: 10}}>File Name</th> 
            <th style={{width: '12%', textAlign: 'center'}}>Processed Date</th>
            <th style={{width: '12%', textAlign: 'center'}}>Location</th>
            <th style={{textAlign: 'center', width: '15%'}} >File Options</th>
          </tr>
        }
          {!this.props.displayAcceptedFiles && this.props.files.items.rejected.map((file, index) =>
            <div style={
              {
                display: 'table-row-group',
                marginBottom: 10,
                marginLeft: 10,
                width: '100%' 
              }} 
              key={index}
              >
                <Files
                  displayAcceptedFiles={this.props.displayAcceptedFiles}
                  deleteAcceptedFiles={this.props.deleteAcceptedFiles}
                  updateAlertHandler={this.updateAlertHandler.bind(this)} 
                  removeSelectedFiles={this.removeSelectedFiles.bind(this)}
                  addToSelectedFiles={this.addToSelectedFiles.bind(this)}
                  fileHandler={this.props.fileHandler}
                  refreshFileLocation={this.props.refreshFileLocation}
                  phoneScrubHandler={this.props.phoneScrubHandler} 
                  allFileSelectHandler={this.props.allFileSelectHandler} 
                  allCheckedSetState={this.props.allCheckedSetState} 
                  handleAllChecked={this.props.handleAllChecked} 
                  selectAllChecked={this.props.selectAllChecked} 
                  fileSelectHandler={this.props.fileSelectHandler} 
                  handleButtonClick={this.props.handleButtonClick} 
                  handleClickOutside={this.props.handleClickOutside} 
                  clickedOutside={this.props.clickedOutside}
                  file={file} open={this.props.open} bank={this.props.bank} data={this.props.data}
                />
            </div>  
          )}
          {this.props.displayAcceptedFiles && this.props.files.items.accepted.map((file, index) =>
            <div style={
              {
                display: 'table-row-group',
                marginBottom: 10,
                marginLeft: 10,
                width: '100%' 
              }} 
              key={index}
              >
                <Files 
                  deleteAcceptedFiles={this.props.deleteAcceptedFiles}
                  displayAcceptedFiles={this.props.displayAcceptedFiles}
                  updateAlertHandler={this.updateAlertHandler.bind(this)} 
                  removeSelectedFiles={this.removeSelectedFiles.bind(this)}
                  addToSelectedFiles={this.addToSelectedFiles.bind(this)}
                  fileHandler={this.props.fileHandler}
                  refreshFileLocation={this.props.refreshFileLocation}
                  phoneScrubHandler={this.props.phoneScrubHandler} 
                  allFileSelectHandler={this.props.allFileSelectHandler} 
                  allCheckedSetState={this.props.allCheckedSetState} 
                  handleAllChecked={this.props.handleAllChecked} 
                  selectAllChecked={this.props.selectAllChecked} 
                  fileSelectHandler={this.props.fileSelectHandler} 
                  handleButtonClick={this.props.handleButtonClick} 
                  handleClickOutside={this.props.handleClickOutside} 
                  clickedOutside={this.props.clickedOutside}
                  file={file} open={this.props.open} bank={this.props.bank} data={this.props.data}
                />
            </div>  
          )}
        </table>
      </div>
    )}
}

export default (Table); 