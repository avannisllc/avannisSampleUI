import React from 'react';
import './../../../App.css';
import { Alert } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import InteviewsHeaderOptions from './InteviewsHeaderOptions'
import "react-datepicker/dist/react-datepicker.css";

class InterviewsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      localStartDate: this.props.localStartDate,
      localEndDate: this.props.localEndDate,
      disabled: this.props.disabled,
      showAlert: !this.props.disabled,
      isChecked: false
    }
  }
  onClick(e) { 
    console.log(e)
  }

  render() {
    let options;
    try {
      if (this.props.interviewGroup[0].key === '0') {
        options = <InteviewsHeaderOptions 
        bank={this.props.bank} 
        interviewGroup={[]} 
        interviewIndex={-1}
        getInterviews={this.props.getInterviews}
        disabled={this.props.disabled}
        startDate={this.props.startDate} endDate={this.props.endDate}
        prevInterviewClick={this.props.prevInterviewClick}
        nextInterviewClick={this.props.nextInterviewClick}/>
      } else if (this.props.interviewGroup[0][0].key === '0') {
        options = <InteviewsHeaderOptions 
        bank={this.props.bank} 
        interviewGroup={[]} 
        interviewIndex={-1}
        getInterviews={this.props.getInterviews}
        disabled={this.props.disabled}
        startDate={this.props.startDate} endDate={this.props.endDate}
        prevInterviewClick={this.props.prevInterviewClick}
        nextInterviewClick={this.props.nextInterviewClick}/>
      } else if (this.props.interviewGroup[0].key !== '0') {
        options = <InteviewsHeaderOptions 
        bank={this.props.bank} 
        interviewGroup={this.props.interviewGroup} 
        interviewIndex={this.props.interviewIndex}
        disabled={this.props.disabled}
        startDate={this.props.startDate} endDate={this.props.endDate}
        getInterviews={this.props.getInterviews}
        showAlertHandler={this.props.showAlertHandler}
        prevInterviewClick={this.props.prevInterviewClick}
        nextInterviewClick={this.props.nextInterviewClick}/>
      } else {
        options = <div></div>
      }
    } catch (err) {

    }
    return (
      <div id='dateRangePickerContainer' >
      <div style={{display: 'inline-flex', width: '100%', justifyContent: 'center', height: '70px', backgroundColor: '#233d4f'}}>
        <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'inline-flex', alignItems: 'center'}}>
            <label className='interviewsUpdatedLabel' for='interviewsUpdatedCheckbox'><span style={{fontWeight: 'bold', color: "white"}}>Include Updated Interviews?</span></label> 
            <input id='interviewsUpdatedCheckbox' type="checkbox"
              onClick={() => {
                this.setState({
                  isChecked: !this.state.isChecked
                })
              }}
            />
            <i style={{fontSize: '26px', margin: '0px 5px 0px 0px', color: 'white'}} class="fas fa-calendar"></i>
            <DatePicker
              style={{cursor: 'pointer'}}
              selected={this.props.startDate}
              onKeyDown={(e)=> {
                if (e.code === 'Enter') {
                  console.log(e)
                  console.log(new Date(e.target.value))
                  this.props.setDateRange(new Date(e.target.value), this.props.endDate, this.state.isChecked)
                  this.props.setLocalDates(e.target.value, true)
                  this.setState({
                  localStartDate: e.target.value
                  })
                  if (this.state.localEndDate.length === 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(), new Date().toLocaleDateString(), this.state.isChecked)
                  else if (this.state.localEndDate.length === 0 && this.state.localStartDate.length !== 0) this.props.getInterviews(this.props.bank.name, this.state.localStartDate, new Date().toLocaleDateString(), this.state.isChecked)
                  else if (this.state.localEndDate.length !== 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(),  this.state.localEndDate, this.state.isChecked)
                  else this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
                  // this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
                }
              }}
              onChange={(date) => {
                this.props.setDateRange(date, this.props.endDate, this.state.isChecked)
                this.props.setLocalDates(date.toLocaleDateString(), true)
                this.setState({
                  localStartDate: date.toLocaleDateString()
                  })
                }}
            />
            <DatePicker
              style={{cursor: 'pointer'}}
              onKeyDown={(e)=> {
                if (e.code === 'Enter') {
                  console.log(e)
                  this.props.setDateRange(this.props.startDate, new Date(e.target.value), this.state.isChecked)
                  this.setState({
                    localEndDate: e.target.value
                  })
                  this.props.setLocalDates(e.target.value, false)
                  if (this.state.localEndDate.length === 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(), new Date().toLocaleDateString(), this.state.isChecked)
                  else if (this.state.localEndDate.length === 0 && this.state.localStartDate.length !== 0) this.props.getInterviews(this.props.bank.name, this.state.localStartDate, new Date().toLocaleDateString(), this.state.isChecked)
                  else if (this.state.localEndDate.length !== 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(),  this.state.localEndDate, this.state.isChecked)
                  else this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
                  // this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
                }
              }}
              selected={this.props.endDate}
              minDate={this.props.startDate}
              onChange={(date) => {
                this.props.setDateRange(this.props.startDate, date, this.state.isChecked)
                this.props.setLocalDates(date.toLocaleDateString(), false)
                this.setState({
                  localEndDate: date.toLocaleDateString()
                  })
                }} 
            />
            </div>
            <button onClick={(e) => {
              // if (!this.state.localEndDate && !this.state.localStartDate) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(), new Date().toLocaleDateString(), this.state.isChecked)
              // else if (!this.state.localEndDate && this.state.localStartDate) this.props.getInterviews(this.props.bank.name, this.state.localStartDate, new Date().toLocaleDateString(), this.state.isChecked)
              // else if (this.state.localEndDate && !this.state.localStartDate) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(),  this.state.localEndDate, this.state.isChecked)
              // else this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
              if (this.state.localEndDate.length === 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(), new Date().toLocaleDateString(), this.state.isChecked)
              else if (this.state.localEndDate.length === 0 && this.state.localStartDate.length !== 0) this.props.getInterviews(this.props.bank.name, this.state.localStartDate, new Date().toLocaleDateString(), this.state.isChecked)
              else if (this.state.localEndDate.length !== 0 && this.state.localStartDate.length === 0) this.props.getInterviews(this.props.bank.name, new Date().toLocaleDateString(),  this.state.localEndDate, this.state.isChecked)
              else this.props.getInterviews(this.props.bank.name, this.state.localStartDate, this.state.localEndDate, this.state.isChecked)
            }} class='bankButton' style={{width: '130px', marginLeft: 10, marginRight: 10}}>Get Interviews</button>
            <button class='bankButton' style={{marginRight: 25}} onClick={(e) => {
              this.props.exportInterviewData()
            }}>
              Export Data
            </button>
            {options}
        </div>
        </div>
        <Alert className='formAlert' variant='danger' show={this.props.showAlert}>Please submit form before continuing!</Alert>
      </div>
    )
  }
};
export default (InterviewsHeader)