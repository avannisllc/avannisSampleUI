import { Tab } from '@headlessui/react'
import React from 'react';
import './App.css';
import InterviewsHeader from './InterviewsHeader';
import Table from './Table'
import Interviews from './Interviews'
import QuotaCards from './QuotaCards'

class Tabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      fileId: this.props.id,
      file: this.props.file,
      checked: false,
      startDate: new Date(),
      endDate: new Date(),
      disabled: true,
      interviewIndex: this.props.interviewIndex,
      interviews: this.props.interviews,
      interviewGroup: this.props.interviewGroup,
      lastInterview: this.props.firstInterview,
      firstInterview: this.props.lastInterview,
      grid: this.props.quotaGrid,
      quotaGridCopy: this.props.quotaGridCopy,
      moGoalClick: 0,
      moSentClick: 0,
      moReceivedClick: 0,
      sendTodayClick: 0,
      revert: false,
      returnDiv: [],
      showAlert: false,
      localStartDate: "",
      localEndDate: ""
    }
  }
  componentDidMount(){
    this.setState({
      grid: this.props.grid
    })
    document.getElementsByClassName('tab1')[0].style.boxShadow = "unset"
    document.getElementsByClassName('tab2')[0].style.boxShadow = "inset 12px -1px 10px 2px rgb(0 0 0 / 20%), inset 5px 1px 5px 0px rgb(0 0 0 / 20%)"
    document.getElementsByClassName('tab3')[0].style.boxShadow = "inset 12px -1px 10px 2px rgb(0 0 0 / 20%), inset 5px 1px 5px 0px rgb(0 0 0 / 20%)"
  }

  showAlertHandler(show){
    this.setState({
      showAlert: show
    })
  }

  setLocalDates(date, isStart){
    if (isStart){
      this.setState({
        localStartDate: date
      })
    } else {
      this.setState({
        localEndDate: date
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.interviewGroup !== this.state.interviewGroup) {
      return true
    } else if (prevState.disabled !== this.state.disabled) {
      return true 
    } else {
      return false
    }
  }

  allMethodsRevert(){
    this.setState({
      revert: !this.state.revert
    },this.props.getQuotas)
  }

  updateGrid(start, end){
    if ((start.i === 0 && end.i === 0) && (start.j === 3 && end.j === 3)){
      if (this.state.moGoalClick % 2 === 0) {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return b[3].value - a[3].value
        });
          this.setState({ 
            grid: newGrid,
            moGoalClick: this.state.moGoalClick + 1,
            moSentClick: 0,
            moReceivedClick: 0,
            sendTodayClick: 0
          })
      } else {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return a[3].value - b[3].value
        });
          this.setState({ 
            grid: newGrid,
            moGoalClick: this.state.moGoalClick + 1,
            moSentClick: 0,
            moReceivedClick: 0,
            sentTodayClick: 0,
          })
      }
    } else if ((start.i === 0 && end.i === 0) && (start.j === 4 && end.j === 4)) {
      if (this.state.moSentClick % 2 === 0) {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return b[4].value - a[4].value
        });
          this.setState({
            grid: newGrid,
            moSentClick: this.state.moSentClick + 1,
            moGoalClick: 0,
            moReceivedClick: 0,
            sentTodayClick: 0,
          })
      } else {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return a[4].value - b[4].value
        });
          this.setState({
            grid: newGrid,
            moSentClick: this.state.moSentClick + 1,
            moGoalClick: 0,
            moReceivedClick: 0,
            sentTodayClick: 0,
          })
      }
      
    } else if ((start.i === 0 && end.i === 0) && (start.j === 5 && end.j === 5)) {
      if (this.state.moReceivedClick % 2 === 0) { 
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return b[5].value - a[5].value
        })
          this.setState({
            grid: newGrid,
            moReceivedClick: this.state.moReceivedClick + 1,
            moGoalClick: 0,
            moSentClick: 0,
            sentTodayClick: 0,
          })
        
      } else {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return a[5].value - b[5].value
        })
          this.setState({
            grid: newGrid,
            moReceivedClick: this.state.moReceivedClick + 1,
            moGoalClick: 0,
            moSentClick: 0,
            sentTodayClick: 0,
          })
        } 
      
    } else if ((start.i === 0 && end.i === 0) && (start.j === 6 && end.j === 6)) {
      if (this.state.sendTodayClick % 2 === 0) { 
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return b[6].value - a[6].value
        })
          this.setState({
            grid: newGrid,
            sendTodayClick: this.state.sendTodayClick + 1,
            moGoalClick: 0,
            moSentClick: 0,
            moReceivedClick: 0,
          })
        } else {
        let newGrid = this.props.quotaGrid.sort(function(a, b) {
          return a[6].value - b[6].value
        })
          this.setState({
            grid: newGrid,
            sendTodayClick: this.state.sendTodayClick + 1,
            moGoalClick: 0,
            moSentClick: 0,
            moReceivedClick: 0,
          })
      }
     } else {
      return
    }
  }
  

  render() {
    return (
      <div style={{width: '100%', display: 'inline-block', padding: 'unset!important'}} > 
        <Tab.Group 
          defaultIndex={0}
          onChange={(index) => { 
            if (index === 0) return (document.getElementsByClassName('tab1')[0].style.boxShadow = "unset", document.getElementsByClassName('tab2')[0].style.boxShadow = "inset 12px -1px 10px 2px rgb(0 0 0 / 20%), inset 5px 1px 5px 0px rgb(0 0 0 / 20%)", document.getElementsByClassName('tab3')[0].style.boxShadow = "inset 12px -1px 10px 2px rgb(0 0 0 / 20%), inset 5px 1px 5px 0px rgb(0 0 0 / 20%)")
            if (index === 1) return (document.getElementsByClassName('tab1')[0].style.boxShadow = "inset -12px -1px 10px 2px rgb(0 0 0 / 20%), inset -5px 1px 5px 0px rgb(0 0 0 / 20%)" ,document.getElementsByClassName('tab2')[0].style.boxShadow = "unset" ,document.getElementsByClassName('tab3')[0].style.boxShadow = "inset 12px -1px 10px 2px rgb(0 0 0 / 20%), inset 5px 1px 5px 0px rgb(0 0 0 / 20%)")
            if (index === 2) return (document.getElementsByClassName('tab1')[0].style.boxShadow = "inset -12px -1px 10px 2px rgb(0 0 0 / 20%), inset -5px 1px 5px 0px rgb(0 0 0 / 20%)" ,document.getElementsByClassName('tab2')[0].style.boxShadow = "inset -12px -1px 10px 2px rgb(0 0 0 / 20%), inset -5px 1px 5px 0px rgb(0 0 0 / 20%)" , document.getElementsByClassName('tab3')[0].style.boxShadow = "unset")
          }}
          manual>
          <Tab.List id='tabList' style={{borderRight:  '2px solid #233d4f'}} className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl" >
            <Tab tabindex="0" className='tab tab1' >
              Sample Data
            </Tab>
            <Tab tabindex="1" id='tab2' className='tab tab2'> 
              Interview Data
            </Tab>
            <Tab id='test' tabindex="2" className='tab tab3'>
              Quotas
            </Tab>
          </Tab.List>
          <Tab.Panels >
            <Tab.Panel > 
              <Table 
                deleteAcceptedFiles={this.props.deleteAcceptedFiles}
                displayAcceptedFiles={this.props.displayAcceptedFiles}
                filesDisplayedHandler={this.props.filesDisplayedHandler}
                tableUploadingFile={this.props.tableUploadingFile}
                tableUploadingFileSuccess={this.props.tableUploadingFileSuccess}
                tableUploadingFileFailure={this.props.tableUploadingFileFailure}
                tableDeletingFiles={this.props.tableDeletingFiles}
                tableDeletingFilesSuccess={this.props.tableDeletingFilesSuccess}
                tableDeletingFilesFailure={this.props.tableDeletingFilesFailure}
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
                files={this.props.files} open={this.props.open} bank={this.props.bank} data={this.props.data}
                />
            </Tab.Panel>
            <Tab.Panel >
              <InterviewsHeader
                exportInterviewData={this.props.exportInterviewData}
                localStartDate={this.state.localStartDate}
                localEndDate={this.state.localEndDate}
                setLocalDates={this.setLocalDates.bind(this)}
                bank={this.props.bank}
                showAlert={this.state.showAlert}
                showAlertHandler={this.showAlertHandler.bind(this)}
                getInterviews={this.props.getInterviews}
                interviewGroup={this.props.interviewGroup}
                lastInterview={this.props.lastInterview}
                nextInterviewClick={this.props.nextInterviewClick}
                prevInterviewClick={this.props.prevInterviewClick}
                interviews={this.props.interviews}
                disabled={this.props.disabled}
                interviewIndex={this.props.interviewIndex} 
                startDate={this.props.startDate} 
                endDate={this.props.endDate} 
                setDateRange={this.props.setDateRange}
              />
              <div class='dateRangeInt' style={{marginBottom: 80}}>
                <Interviews 
                  showAlertHandler={this.showAlertHandler.bind(this)}
                  textAreaChange={this.props.textAreaChange} 
                  returnDiv={this.state.returnDiv} 
                  displaySubmit={this.props.displaySubmit} 
                  interviewGroup={this.props.interviewGroup} 
                  submitInterview={this.props.submitInterview} 
                  lastInterview={this.props.lastInterview} 
                  interviewIndex={this.props.interviewIndex} 
                  interviews={this.props.interviews} 
                  disabled={this.props.disabled} 
                  formSubmitDisableHandler={this.props.formSubmitDisableHandler}
                  interviewScrubHandler={this.props.interviewScrubHandler}
                />
            </div>
            </Tab.Panel>
            <Tab.Panel>
              <QuotaCards
                quotaGridCopy={this.props.quotaGridCopy}
                sendQuotaSending={this.props.sendQuotaFail}
                sendQuotaFail={this.props.sendQuotaFail}
                sendQuotaSuccess={this.props.sendQuotaSuccess}
                filters={this.props.filters}
                sendToVendors={this.props.sendToVendors}
                updateSendTodayAll={this.props.updateSendTodayAll}
                timeOfLastQuotaRefresh={this.props.timeOfLastQuotaRefresh}
                bank={this.props.bank}
                getQuotas={this.props.getQuotas}
                revert={this.state.revert}
                allMethodsRevert={this.allMethodsRevert.bind(this)}
                grid={this.props.quotaGrid}
                updateGrid={this.updateGrid.bind(this)}
               />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    )}
}

export default (Tabs);