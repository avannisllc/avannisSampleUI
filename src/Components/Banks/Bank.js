import React from 'react';
import './../../App.css';
import Tabs from './../../Containers/TabsContainer/TabsDashboard/Tabs'
import DeactivateBankBtn from './DeactivateBankBtn'

class Bank extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      banks: this.props.bank,
      selectAllChecked: this.props.selectAllChecked,
      
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.bank !== this.props.bank){
      return true
    } else {
      return false 
    }
  }
 
  render () {
    return (
      <div style={{marginTop: 0}}>
        {this.props.bank.map(bank => {
            return <div  style={{width: "95vw", display: 'inline-flex', marginTop: 5, flexDirection: 'column', alignItems: 'center'}} className='div' key={bank.id || bank.name}>
                      <div className='bankGlobalContainer' style={
                        { display: 'inline-table',
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          backgroundColor: '#EFEFEF',
                          borderLeft: '2px solid #233d4f',
                          borderTop: '2px solid #233d4f',
                          borderRight: '2px solid #233d4f'}
                        }>
                        <h1 className='bankNameGlobal' >{bank.formatted_name}</h1>
                        <p style={{marginTop: 0, marginBottom: 0, color: '#233d4f', fontWeight: 'bold'}}>- SMKEY: {bank.name} -</p>
                        <DeactivateBankBtn bank={this.props.bank} deactivateBank={this.props.deactivateBank} />
                      </div>
                      <Tabs 
                        exportInterviewData={this.props.exportInterviewData}
                        deleteAcceptedFiles={this.props.deleteAcceptedFiles}
                        filesDisplayedHandler={this.props.filesDisplayedHandler}
                        displayAcceptedFiles={this.props.displayAcceptedFiles}
                        tableUploadingFile={this.props.tableUploadingFile}
                        tableUploadingFileSuccess={this.props.tableUploadingFileSuccess}
                        tableUploadingFileFailure={this.props.tableUploadingFileFailure}
                        tableDeletingFiles={this.props.tableDeletingFiles}
                        tableDeletingFilesSuccess={this.props.tableDeletingFilesSuccess}
                        tableDeletingFilesFailure={this.props.tableDeletingFilesFailure}
                        quotaSendingHandler={this.props.quotaSendingHandler}
                        sendQuotaSending={this.props.sendQuotaFail}
                        sendQuotaFail={this.props.sendQuotaFail}
                        sendQuotaSuccess={this.props.sendQuotaSuccess}
                        fileHandler={this.props.fileHandler}
                        filters={this.props.filters}
                        sendToVendors={this.props.sendToVendors}
                        firstInterview={this.props.firstInterview}
                        lastInterview={this.props.lastInterview} 
                        interviewIndex={this.props.interviewIndex}
                        nextInterviewClick={this.props.nextInterviewClick}
                        prevInterviewClick={this.props.prevInterviewClick}
                        updateSendTodayAll={this.props.updateSendTodayAll}
                        disabled={this.props.disabled}
                        formSubmitDisableHandler={this.props.formSubmitDisableHandler}
                        emailChange={this.props.emailChange}
                        phoneChange={this.props.phoneChange}
                        textAreaChange={this.props.textAreaChange}
                        displaySubmit={this.props.displaySubmit}
                        timeOfLastQuotaRefresh={this.props.timeOfLastQuotaRefresh}
                        getQuotas={this.props.getQuotas}
                        quotaGridCopy={this.props.quotaGridCopy}
                        quotaGrid={this.props.quotaGrid}
                        getInterviews={this.props.getInterviews}
                        interviewGroup={this.props.interviewGroup}
                        submitInterview={this.props.submitInterview}
                        timeOfLastScrub={this.props.timeOfLastScrub}
                        interviews={this.props.interviews}
                        refreshFileLocation={this.props.refreshFileLocation}
                        interviewScrubHandler={this.props.interviewScrubHandler}
                        phoneScrubHandler={this.props.phoneScrubHandler}
                        startDate={this.props.startDate} endDate={this.props.endDate} setDateRange={this.props.setDateRange} 
                        allFileSelectHandler={this.props.allFileSelectHandler} 
                        allCheckedSetState={this.props.allCheckedSetState} 
                        handleAllChecked={this.props.handleAllChecked} selectAllChecked={this.props.selectAllChecked} 
                        fileSelectHandler={this.props.fileSelectHandler} 
                        handleButtonClick={this.props.handleButtonClick} 
                        handleClickOutside={this.props.handleClickOutside} 
                        clickedOutside={this.props.clickedOutside} 
                        files={bank.files} 
                        open={this.props.open} bank={bank} data={this.props.data}/>
                    </div>
        })
      }
      </div>
      
    )}
}

export default (Bank); 