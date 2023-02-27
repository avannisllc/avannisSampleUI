import React from 'react';
import { Button } from 'react-bootstrap';

class InterviewFormButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={{display: 'inline-flex'}}>
        <Button 
          id='formSubmit'
          onClick={(e) => {
            this.props.submitInterview()
            this.props.formSubmitDisableHandler(true); 
            console.log('submit')
            this.props.showAlertHandler(false)
            }}
          disabled={this.props.disabled}>
          Submit
        </Button>
      </div>
    )
  }
}

export default (InterviewFormButton)
