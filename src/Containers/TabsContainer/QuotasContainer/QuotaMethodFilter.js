import React from 'react';
import { ToggleButtonGroup, Button } from 'react-bootstrap'
import './../../../App.css';


function QuotaMethodFilter(props) {
  
  return (
    <> <Button id="tbg-radio-1" value={3} onClick={(e) => {
      console.log(e)
      props.refreshGrid()
      e.target.nextSibling.children[0].style.backgroundColor = 'white'
      e.target.nextSibling.children[0].style.color = '#233d4f'
      e.target.nextSibling.children[0].style.border = '2px solid white!important'
      e.target.nextSibling.children[1].style.backgroundColor = 'white'
      e.target.nextSibling.children[1].style.color = '#233d4f'
      e.target.nextSibling.children[1].style.border = '2px solid white!important'
      }}> 
    Refresh Quotas
    </Button>
      <ToggleButtonGroup type="radio" name="options" style={{marginRight: -20}} defaultValue={1}>
        
        <Button  id="tbg-radio-2" value={1} onClick={(e) => { 
          if (props.onlineClicks === 0 && props.phoneClicks=== 1){
            props.refreshGrid('online')
            props.methodSortOnline()
            e.target.style.backgroundColor = '#233d4f'; 
            e.target.style.color = 'white'; 
            e.target.style.borderRight = '1px solid white'; 
            e.target.nextSibling.style.backgroundColor = 'white'
            e.target.nextSibling.style.borderLeft = '1px solid white'; 
            e.target.nextSibling.style.color = '#233d4f'
            e.target.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.parentElement.parentElement.children[0].style.color = '#233d4f'
          }

          else if (props.onlineClicks === 0) {
            console.log(e)
            props.methodSortOnline()
            e.target.style.backgroundColor = '#233d4f'; 
            e.target.style.color = 'white'; 
            e.target.style.borderRight = '1px solid white'; 
            e.target.nextSibling.style.backgroundColor = 'white'
            e.target.nextSibling.style.borderLeft = '1px solid white'; 
            e.target.nextSibling.style.color = '#233d4f'
            e.target.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.parentElement.parentElement.children[0].style.color = '#233d4f'
          } else {
            console.log(e)
            props.refreshGrid('online')
            e.target.style.backgroundColor = 'white';  
            e.target.style.boderColor = 'unset'; 
            e.target.style.color = '#233d4f'; 
            e.target.style.borderLeft = '2px solid white'
            e.target.style.borderBottom = '2px solid white'
            e.target.style.borderTop = '2px solid white'
            e.target.nextSibling.style.backgroundColor = 'white'
            e.target.nextSibling.style.borderLeft = 'revert'; 
            e.target.nextSibling.style.color = '#233d4f'
            e.target.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.parentElement.parentElement.children[0].style.color = '#233d4f'
          }
        }}>
        Online
        </Button>
        <Button id="tbg-radio-3" value={2} onClick={(e) => {
          if (props.phoneClicks === 0 && props.onlineClicks === 1){
            props.refreshGrid('phone')
            props.methodSortPhone()
            e.target.style.backgroundColor = '#233d4f'; 
            e.target.style.color = 'white'; 
            e.target.style.borderLeft = '1px solid white';
            e.target.previousSibling.style.backgroundColor = 'white'
            e.target.previousSibling.style.borderRight = '1px solid white';
            e.target.previousSibling.style.color = '#233d4f'
            e.target.previousSibling.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.previousSibling.parentElement.parentElement.children[0].style.color = '#233d4f'
          }

          else if (props.phoneClicks === 0) {
            props.methodSortPhone()
            e.target.style.backgroundColor = '#233d4f'; 
            e.target.style.color = 'white'; 
            e.target.style.borderLeft = '1px solid white';
            e.target.previousSibling.style.backgroundColor = 'white'
            e.target.previousSibling.style.borderRight = '1px solid white';
            e.target.previousSibling.style.color = '#233d4f'
            e.target.previousSibling.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.previousSibling.parentElement.parentElement.children[0].style.color = '#233d4f'
          } else {
            props.refreshGrid('phone')
            e.target.style.backgroundColor = 'white'; 
            e.target.style.color = '#233d4f'; 
            e.target.style.borderColor = 'unset'; 
            e.target.style.borderLeft = '1px solid #233d4f!important';
            e.target.style.borderRight = '2px solid white';
            e.target.style.borderBottom = '2px solid white';
            e.target.style.borderTop = '2px solid white';
            e.target.previousSibling.style.backgroundColor = 'white'
            e.target.previousSibling.style.borderRight = '1px solid white';
            e.target.previousSibling.style.color = '#233d4f'
            e.target.previousSibling.parentElement.parentElement.children[0].style.backgroundColor = 'white'
            e.target.previousSibling.parentElement.parentElement.children[0].style.color = '#233d4f'
          }
        }}>
        Phone
        </Button>
        
      </ToggleButtonGroup>
    </>
  );
}

export default (QuotaMethodFilter)