import React from 'react';
import './App.css';
import File from './File'

class FileGroup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      selectAll: false
    }
  }
  
  

  render () {
    return (
      <File allFileSelectHandler={this.props.allFileSelectHandler} allCheckedSetState={this.props.allCheckedSetState} handleAllChecked={this.props.handleAllChecked} selectAllChecked={this.props.selectAllChecked} fileSelectHandler={this.props.fileSelectHandler} file={this.props.file} handleButtonClick={this.props.handleButtonClick} clickedOutside={this.props.clickedOutside} handleClickOutside={this.props.handleClickOutside} open={this.props.open}/>
    )}
}

export default (FileGroup); 