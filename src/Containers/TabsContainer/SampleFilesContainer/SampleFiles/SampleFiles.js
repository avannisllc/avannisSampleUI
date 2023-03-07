import React from 'react';
import './../../../../App.css';
import FileDropdown from './../FileDropdown';
import FileErrorModal from './../Modals/FileErrorModal';


class SampleFiles extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         checked: this.props.selectAllChecked,
         file: this.props.file,
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

   render (
      {addToSelectedFiles, removeSelectedFiles, allFileSelectHandler, selectAllChecked}=this.props,
      {checked, file}=this.state
   ) {
      return (
         <>
            <tr style={{width: '100%'}}>
            <td value={this.props.file.id} style={{textAlign: 'center', verticalAlign: 'middle'}}>
            {/* <div style={{display: 'contents'}}> */}
               <input 
                  checked={checked} 
                  onChange={(e) => {
                     if (!checked){
                        addToSelectedFiles(file)
                     } else {
                        removeSelectedFiles(file)
                     }
                     // props.fileSelectHandler(e, isChecked)
                     this.setCheckedState()
                  }}
                  type="checkbox" 
                  value={this.props.file.id} 
                  name={this.props.file.name}
                  class='fileDropdown' 
               />
            </td>
            <td
               className='fileNameTable'
               style={{textAlign: 'justify', verticalAlign: 'middle', textIndent: 10}}
               onClick={(e) => {
                  let file = this.props.file
                  file.id = e.target.previousSibling.attributes[0].value
                  this.props.allFileSelectHandler(file, this.props.selectAllChecked, true)
                  if (!checked){
                     this.props.addToSelectedFiles(file)
                  } else {
                     this.props.removeSelectedFiles(file)
                  }
                  // props.fileSelectHandler(e, isChecked)
                  this.setCheckedState()
               }}>
               {this.props.file.name}
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle', textTransform: 'uppercase'}}>
                  {this.props.file.processed_date}
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle', textTransform: 'uppercase'}}>
                  {this.props.file.file_duped_date}
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle', textTransform: 'uppercase', fontSize: 15}}>
               <div  style={{verticleAlign: "middle"}}>
                  {this.props.file.name === "No files available" &&
                  <span>N/A</span>
                  }
                  {this.props.file.stage !== 'Rejected' &&
                  <span>{this.props.file.location}</span>
                  }
                  {this.props.file.stage === 'Rejected' &&
                  <div  style={{verticleAlign: "middle"}}>
                     {this.props.file.location}
                     <FileErrorModal file={this.props.file} />
                  </div>}
               </div>
            </td>
            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
               <FileDropdown 
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
            </td>
         </tr>
      </> 
   )}
}

export default (SampleFiles)