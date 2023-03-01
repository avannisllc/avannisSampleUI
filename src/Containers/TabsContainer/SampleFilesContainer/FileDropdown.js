import React from 'react';
import './../../../App.css';
import FileDropdownOptions from './FileDropdownOptions'

class FileDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      fileId: this.props.file.id
    }
  }

  container = React.createRef();
    state = {
      open: this.props.open,
    };

  handleButtonClick = (e, fileId) => {
    e.preventDefault()

    if (e.target.nodeName.includes('BUTTON')) {
      this.setState({
        open: this.state.open,
      })
    }
    this.setState({
      fileId: fileId
    })
  };

  handleOutsideClick(e) {
    e.preventDefault()
    document.getElementsByClassName('App')[0].addEventListener('click', (e) => {
      if ((e.target.id !== "dropdownBtnDelete") && (e.target.nodeName !== "BUTTON" || e.target.nodeName === 'BUTTON') && (e.target.name !== this.state.fileId)) {
        this.setState({
          open: false
        })
      }
    })
    document.getElementsByClassName('App')[0].removeEventListener('click', this.handleOutsideClick)
  }

  render () {
    return (
      <div class="container" ref={this.container}>
        <button type="button" name={this.props.file.id} class="fileButton" onClick={(e) => {
          if (e.target.name === this.props.file.id){
            this.setState({
              open: !this.state.open,
              fileId: this.props.file.id
          
        }, this.handleOutsideClick(e))
        }}}>
          ☰
        </button>
        {this.state.open && (
          <div class="dropdown" id={this.props.file.id}>
            <FileDropdownOptions deleteAcceptedFiles={this.props.deleteAcceptedFiles} updateAlertHandler={this.props.updateAlertHandler}  fileHandler={this.props.fileHandler} bank={this.props.bank} refreshFileLocation={this.props.refreshFileLocation} phoneScrubHandler={this.props.phoneScrubHandler} file={this.props.file} id={this.props.file.id} />
          </div>
        )}
      </div>
    )}
}

export default (FileDropdown); 