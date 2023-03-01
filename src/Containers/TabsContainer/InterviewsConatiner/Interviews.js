import React from 'react';
import './../../../App.css';
import InterviewFormGroup from './InterviewFormGroup'
import InterviewFormButton from './InterviewFormButton'

class Interviews extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      selectAll: false,
      disabled: this.props.disabled,
      interviews: this.props.interviews,
      interviewGroup: this.props.interviewGroup,
      interviewIndex: this.props.interviewIndex,
      email: [],
      phone: [],
      textAreas: [],
    }
  }

  componentDidMount(){
    let intInterval = setInterval(() => {
      try {
          document.getElementsByClassName('tab2')[0].scrollIntoView(true) 
          clearInterval(intInterval)
      } catch {
      }
    }, 100)
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.interviewIndex !== this.props.interviewIndex){
      return true
    } else {
      return false
    }
  }
  
  render() {
    let formButton
    if (this.props.displaySubmit === true) {
     formButton = <div class='formSubmitDisplayOn'>
                    <InterviewFormButton 
                      submitInterview={this.props.submitInterview}
                      showAlertHandler={this.props.showAlertHandler}
                      disabled={this.props.disabled} 
                      interviewScrubHandler={this.props.interviewScrubHandler}
                      formSubmitDisableHandler={this.props.formSubmitDisableHandler}
                    />
                  </div>
    } else {
      formButton = <div style={{display: 'none'}}></div>
    }
    return (
      <>
      <form 
        id='formId'
        style={{
          width: '100%',
          height: 'auto',
          backgroundColor: '#EFEFEF',
          border: '2px outset black',
          overflowY:'auto',
          textAlign: 'left',
          textIndent: 10,
          display: 'inline-flex',
          justifyContent: 'center'}}>
          <div style={{ maxHeight: "70vh", overflowY: 'scroll'}}>
         <InterviewFormGroup 
          returnDiv={this.props.returnDiv} 
          interviewGroup={this.props.interviewGroup} 
          textAreaChange={this.props.textAreaChange} 
          interviewScrubHandler={this.props.interviewScrubHandler} 
          interviewIndex={this.props.interviewIndex} 
          formSubmitDisableHandler={this.props.formSubmitDisableHandler} 
          interviews={this.props.interviews} 
          disabled={this.props.disabled}/>
        </div>
        {formButton}
        
      </form>
      </>
    )
  }
}

export default (Interviews) 