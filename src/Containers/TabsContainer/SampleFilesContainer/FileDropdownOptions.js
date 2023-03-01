import React from 'react';
import './../../../App.css';
import FileDropdownButtons from './FileDropdownButtons'

class FileDropdownOptions extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      fileId: this.props.id,
      file: this.props.file
    }
  }

  render() {
    return (
      <div>
        <ul>
          <FileDropdownButtons deleteAcceptedFiles={this.props.deleteAcceptedFiles} updateAlertHandler={this.props.updateAlertHandler}  fileHandler={this.props.fileHandler} bank={this.props.bank} refreshFileLocation={this.props.refreshFileLocation} phoneScrubHandler={this.props.phoneScrubHandler} file={this.props.file}  id={this.state.fileId}/>
        </ul>
      </div>
    )}
}

export default (FileDropdownOptions);