import React from 'react';
import FileModalDelete from './FileModalDelete';
// import Amplify, { API , Storage, Auth } from 'aws-amplify';
import './App.css';
Storage.AWSS3 = {
  bucket: 'avannis-data-processing', //REQUIRED -  Amazon S3 bucket name
  region: 'us-west-2', //OPTIONAL -  Amazon service region
}

class DropdownButtons extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      fileId: this.props.id,
      file: this.props.file,
      bank: this.props.bank
    }
  }

  componentDidMount(){
    let btns = document.getElementsByClassName('dropdownBtn')
    let phoneScrubHandler = this.props.phoneScrubHandler
    let refreshFileLocation =this.props.refreshFileLocation
    let file = this.props.file
    let bank = this.props.bank
    let fileHandler = this.props.fileHandler
    for (let i = 0; i < btns.length; i++) {
      if (i === 0){
        btns[i].addEventListener('click', function(){
          fileHandler(file.name, 'download')
        }, {once: true})
      }
      if (i === 1 && btns[i].innerHTML === "Replace File"){
        btns[i].addEventListener('click', function(){
          document.getElementById('getFileReplace').click()
        }, {once: true})
      }
    }
  }

  render() {
    
    return (
      <div>
        <li class='dropdownBtnContainer'>
          <button id='dropdownBtn' className="dropdownBtn"> Download File</button>
        </li>
        {this.props.file.error &&
        <li class='dropdownBtnContainer'>
          <button id='dropdownBtn' className="dropdownBtn">Replace File</button>
          <input type='file' id="getFileReplace" style={{display:'none'}} 
            onInput={(e) => {
              console.log(e)
              // props.updateAlertHandler('upload')
              let name = e.target.files["0"].name
              this.props.fileHandler(name.slice(0, name.indexOf('.')), 'upload', e.target.value)
              this.props.fileHandler(this.props.file.name, 'delete')
            }}
        ></input>
        </li>
        }
        <li class='dropdownBtnContainer'>
          <FileModalDelete deleteAcceptedFiles={this.props.deleteAcceptedFiles} updateAlertHandler={this.props.updateAlertHandler}  fileHandler={this.props.fileHandler} file={this.props.file.name} />
        </li>
      </div>
    )}
}

export default (DropdownButtons);

