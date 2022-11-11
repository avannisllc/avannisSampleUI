import { unset } from 'lodash';
import React, { useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    id='dropdownAElement'
    className='dropdownAElement'
    style={{
      minWidth: 250,
      // width: 300,
      maxWidth: 300,
      textIndent: "unset!important",
      backgroundColor: "rgb(35, 61, 79)",
      border: "2px solid white",
      color: "white",
      padding: 10,
      marginLeft: 10,
      borderRadius: 10,
      position: "absolute",
      display: "block",
      textAlign: "center"
    }}

    data-content={children}
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy, props}, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          name={props.label}
          id="formControl"
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child, index) => {
              if (child.props.children.toLowerCase().startsWith(value) && children[children.length - 1].key === "noResults") {
                children.pop()
                return true
             } else if (!value && child.props.children.indexOf("No results") > -1){
                children.pop()
                return true
              } else if (value && child.props.children.indexOf("No results") > -1){
                children.pop()
                return true
              }  else if(!value || child.props.children.toLowerCase().startsWith(value)) {
                return true
              } else if (
              (index === children.length - 1) && 
              (!child.props.children.toLowerCase().startsWith(value) || !value) && 
              (child.props.children.indexOf("No results") === -1)) {
                let noResults = [<a class="dropdown-item" role="button" key="noResults" eventkey="No results." >No results.</a>]
                children.push(...noResults)
                return true
              } else if (
              (index === children.length - 1) && 
              !child.props.children.toLowerCase().startsWith(value) && 
              (child.props.children.indexOf("No results") > -1)) {
              return true
              }
            }
          )}
        </ul>
      </div>
    );
  },
);

class InterviewsDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: this.props.defaultValue,
      key: this.props.key
    }
  }

  render() {
    return (
    <div
    style={{
      paddingTop: 10,
      marginBottom: 25
    }}
    >
      <div style={{}}>
        <span 
          style={{fontWeight: 'bold'}}>
          {!this.props.label.includes('code') && this.props.label}
        </span>
      </div>
      <Dropdown
        id='intDropdown'
        data-code={this.props.label}
        style={{
          paddingTop: 5,
          paddingBottom: 25,
          zIndex: 'unset',
          maxWidth: 325,
          display: "flex",
          justifyContent: "center",
          textAlign: "center"
        }}
        onSelect={(e)=> {
          this.props.formDropdownChange(e, this.props.label, this.props.options)
        }}
      >
        <Dropdown.Toggle 
          style={{
            minWidth: 100,
            backgroundColor: '#233d4f',
            border: '2px solid white'
          }}
          id="dropdown-basic"
          as={CustomToggle}
        >
        {this.state.value || "Select an option"}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          props={this.props}
          style={{
            maxHeight: 300,
            zIndex: 5,
            overflow: 'scroll',
            backgroundColor: 'white',
            inset: 'unset'
          }}
        >
        {this.props.options.map((option, index) => {
          return <Dropdown.Item 
            key={option + index}
            eventKey={option}
            defaultValue={this.props.defaultValue}
            onClick={(e)=> {
            this.setState({
              value: e.target.text
            })
          }}>{option}</Dropdown.Item>
        })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
}

export default (InterviewsDropdown)