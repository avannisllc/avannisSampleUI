import React from 'react';

class InterviewFormGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      none: 0,
      form: this.props.file,
      interviews: this.props.interviews,
      interviewIndex: this.props.interviewIndex,
      interviewGroup: this.props.interviewGroup,
      disabled: this.props.disabled,
      raw: "",
      normalized: "",
      formatted: "",
      email: [],
      phone: [],
      codes: [],
      textAreas: [],
      optionSelected: null,
      options: [{name: 'Option 1', group: 'test', id: 1},{name: 'Option 2', group: 'test2', id: 2}],
      groupedObject: 'group',
      selectedValues: [],
      renderCount: 0,
      testForm: '',
      returnDiv: this.props.returnDiv
    }
  }

  componentDidMount(){
    // interview = this.props.interviewGroup[this.props.interviewIndex]
  } 
  shouldComponentUpdate(nextProps, nextState){
    if (nextProps !== this.props) {
      return  true 
     } 
     else {
       return false
      }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.interviewIndex !== this.props.interviewIndex) {
    return  true 
   } 
   else {
     return false
    }
  }

  onSelect(selectedList, selectedItem) {
      console.log(selectedList)
      console.log(selectedItem)
      let array = this.state.selectedValues;
      array.push(selectedItem)
      this.setState({
        selectedValues: array
      })
  }

  render() {
    return ( 
      <div 
        style={{
          width: '90%',
          textAlign: '-webkit-center'
        }}
      >   
        {this.props.interviewGroup[this.props.interviewIndex]}
      </div>
      )
  }
}

export default (InterviewFormGroup)

