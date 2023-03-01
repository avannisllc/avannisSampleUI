import React from 'react'
// import InterviewFilter from './InterviewFilter'

class InterviewsHeaderOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }

  render() {
    return (
      <>
        <span style={{color: 'white', fontWeight: 'bold', marginRight: 10}}>
          Results: {this.props.interviewIndex + 1}/{this.props.interviewGroup.length}
        </span>
          <i 
            id='formArrow'
            style={{float: 'right', marginRight: 5, marginLeft: 10, fontSize: 24, color: 'white', cursor: 'pointer'}} 
            onClick={(e) => { 
              if (this.props.disabled === false) {
                this.props.showAlertHandler(true)
              } else {
                this.props.showAlertHandler(false)
              }
              console.log('prev!'); this.props.prevInterviewClick(e)}} 
            class="fas fa-chevron-circle-left">
          </i>
          <i 
            id='formArrow'
            style={{float: 'right', marginRight: -30, fontSize: 24, color: 'white', cursor: 'pointer'}} 
            onClick={(e) => {
              if (this.props.disabled === false) {
                this.props.showAlertHandler(true)
              } else {
                this.props.showAlertHandler(false)
              }
              console.log('next!'); 
              this.props.nextInterviewClick(e)}} 
            class="fas fa-chevron-circle-right">
          </i>
      </>
    )
  }
}

export default (InterviewsHeaderOptions)