import React, { useState } from 'react';
import { FormControl, Dropdown } from 'react-bootstrap'
import './../../../App.css';

const CustomToggle = React.forwardRef(({children, onClick }, ref) => (
  <span
    style={{color: '#233d4f', padding: '0.75rem', backgroundColor: 'white', width: '160px'}}
    // href=""
    ref={ref}
    onClick={(e) => {
      // e.preventDefault();
      onClick(e); 
    }}
  >
    {children}
    &#x25bc;
  </span>
));

// forwardRef again here! 
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={{marginTop: 10}}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => {
            setValue(e.target.value)
          }}
          value={value}
          style={{width: '140px'}}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

export default function Filter(props) {
const [value, setValue]=useState('Filter Options');
const handleSelect = (e) => {
  setValue(e)
}
return(
  <Dropdown style={{width: 160}} onSelect={(e) => {
    console.log(e)
    let text = e
    let cutIndex = text.indexOf(' ') + 1
    let filterChoice = text.slice(cutIndex, text.length)
    props.getInterviews(e, props.bank.name, props.startDate, props.endDate, filterChoice)
    handleSelect(e)}}>
    <Dropdown.Toggle style={{backgroundColor: 'black'}} as={CustomToggle} id="dropdown-custom-components">
      {value}
    </Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu}>
      <Dropdown.Item eventKey="Date Decending">Date Decending</Dropdown.Item>
      <Dropdown.Item eventKey="Date Ascending">Date Ascending</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}