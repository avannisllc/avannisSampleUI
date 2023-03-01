import React from 'react';
import './App.css';
import FileDropdown from './FileDropdown'
import FileModal from './FileErrorModal'
import AcceptedFiles from './AcceptedFiles';
import RejectedFiles from './RejectedFiles';

class Files extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: this.props.file,
      checked: this.props.selectAllChecked
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectAllChecked !== this.props.selectAllChecked) {
      if (this.props.selectAllChecked === false){
        this.setState({ checked: false })
        this.props.allFileSelectHandler(this.state.file, this.props.selectAllChecked, false)
      } else {
        this.setState({ checked: true })
        this.props.allFileSelectHandler(this.state.file, this.props.selectAllChecked, false)
      }
    } 
  }

  setCheckedState(){
    this.setState({
      checked: !this.state.checked
    })
  }

  render () {
    return (
      <>
      {!this.props.displayAcceptedFiles && 
        <RejectedFiles 
          name={this.props.file.name} 
          value={this.props.file.id} 
          checked={this.state.checked} 
          allFileSelectHandler={this.props.allFileSelectHandler} 
          addToSelectedFiles={this.props.addToSelectedFiles} 
          removeSelectedFiles={this.props.removeSelectedFiles} 
          setCheckedState={this.setCheckedState.bind(this)}
          deleteAcceptedFiles={this.props.deleteAcceptedFiles}
          updateAlertHandler={this.props.updateAlertHandler} 
          fileHandler={this.props.fileHandler}
          refreshFileLocation={this.props.refreshFileLocation}
          phoneScrubHandler={this.props.phoneScrubHandler} 
          handleButtonClick={this.props.handleButtonClick} 
          clickedOutside={this.props.clickedOutside} 
          handleClickOutside={this.props.handleClickOutside} 
          open={this.props.open} 
          file={this.props.file} 
          bank={this.props.bank}
        />
      }
      {this.props.displayAcceptedFiles &&
        <AcceptedFiles 
          name={this.props.file.name} 
          value={this.props.file.id} 
          checked={this.state.checked} 
          allFileSelectHandler={this.props.allFileSelectHandler} 
          addToSelectedFiles={this.props.addToSelectedFiles} 
          removeSelectedFiles={this.props.removeSelectedFiles} 
          setCheckedState={this.setCheckedState.bind(this)}
          deleteAcceptedFiles={this.props.deleteAcceptedFiles}
          updateAlertHandler={this.props.updateAlertHandler} 
          fileHandler={this.props.fileHandler}
          refreshFileLocation={this.props.refreshFileLocation}
          phoneScrubHandler={this.props.phoneScrubHandler} 
          handleButtonClick={this.props.handleButtonClick} 
          clickedOutside={this.props.clickedOutside} 
          handleClickOutside={this.props.handleClickOutside} 
          open={this.props.open} file={this.props.file} bank={this.props.bank}
        />
      }
      </>
    )}
}

export default (Files); 