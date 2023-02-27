import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap'
import QuotaSurveyDropdownItem from './QuotaSurveyDropdownItem'
import xIcon from './../../images/circle-xmark-regular.svg'
import './../../App.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    style={{color: '#233d4f', padding: '0.83rem', backgroundColor: 'white', width: '160px', borderRadius: 5}}
    // href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e); 
    }}
  >
    {children}
    <span style={{marginLeft: 5}} className='quotaFilterIcon'>
      &#x25bc;
    </span>
  </span>
));

// forwardRef again here! 
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    let filteredChildren = React.Children.toArray(children).filter(
      (child) =>
        !value || child.props.children.toLowerCase().startsWith(value),
    )
    return (
      <div
        ref={ref}
        style={{marginTop: 12}}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {filteredChildren}
        </ul>
      </div>
    );
  },
);

class QuotaSurveyFilter extends React.Component {
  constructor(props){
    super(props)
    this.state={
      value: 'Filter by Survey'
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.grid !== this.props.grid){
      return true
    } else {
      return false
    }
  }
  render() {
    let img = <img style={{width: 15, marginRight: 4, marginBottom: 2}} alt='blah' src={xIcon}></img>
    return(
      <Dropdown style={{alignSelf: "center", marginLeft: -20}} onSelect={(e) => {this.setState({value: e})}}>
        <Dropdown.Toggle defaultValue="Filter by survey" style={{backgroundColor: 'black'}} as={CustomToggle} id="dropdown-custom-components">
          {this.state.value}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}> 
          <Dropdown.Item  id='filterOptionRemove' onClick={(e) => this.props.refreshGrid(e)} eventKey="Filter by Survey" >{img}Remove Filter</Dropdown.Item>
          <QuotaSurveyDropdownItem filters={this.props.filters} grid={this.props.grid} surveySort={this.props.surveySort} />
        </Dropdown.Menu>
      </Dropdown>
      );
  }

}

export default (QuotaSurveyFilter)