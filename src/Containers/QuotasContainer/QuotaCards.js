import React from 'react';
import { Button, Card, Alert } from 'react-bootstrap'; 
import ReactDataSheet from 'react-datasheet';
import QuotaMethodFilter from './QuotaMethodFilter';
import QuotaSurveyFilter from './QuotaSurveyFilter';
import _ from 'lodash';
import 'react-datasheet/lib/react-datasheet.css';
import './../../App.css';


class QuotaCards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      grid: this.props.grid,
      quotaGridCopy: this.props.quotaGridCopy,
      mounted: false,
      unSelect: false,
      revert: false,
      filters: this.props.filters,
      online: false,
      phone: false,
      onlineClicks: 0,
      phoneClicks: 0,
      sendTodayAll: 0,
      sendQuotaSending: this.props.sendQuotaSending, 
      now: 65
    }
  }
  componentDidMount(){
    let quotaInterval = setInterval(() => {
      try {
          document.getElementsByClassName('tab3')[0].scrollIntoView(true) 
          clearInterval(quotaInterval)
      } catch {
  
      }
    }, 100)
    // this.props.getQuotas(this.props.bank.name)
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.grid !== this.props.grid){
      this.setState({
        grid: this.props.grid,
        filters: this.props.filters,
        sendQuotaSending: false,
        count: 1
      })
      return true
    } else if (prevProps.filters !== this.props.filters) {
      this.setState({
        filters: this.props.filters
      })
      return true
    } else if (prevProps.sendQuotaSending !== this.props.sendQuotaSending) {
      this.setState({
        sendQuotaSending: false
      })
      return true
     } else if (this.state.count === 1) {
       this.setState({
         count: 0
       })
       return true
     } else {
      return false
    }
  }

  handleOutsideClick(e) {
    e.preventDefault()
    document.getElementsByClassName('App')[0].addEventListener('click', (e) => {
      if ((e.target.nodeName !== "BUTTON") || (e.target.nodeName === 'BUTTON' && e.target.name !== this.state.fileId)) {
        this.setState({
          open: false
        })
      }
    })
    document.getElementsByClassName('App')[0].removeEventListener('click', this.handleOutsideClick)
  }

  async refreshGrid(filterClicked){
    let clicked
    await this.props.getQuotas()
    filterClicked ?  clicked = filterClicked : clicked = ''
    if (clicked === 'online' && this.state.onlineClicks === 1) {
      this.setState({
        grid: this.props.grid,
        online: true,
        onlineClicks: 0,
        phoneClicks: 0,
        phone: false,
        revert: !this.state.revert,
      }) 
    } else if (clicked === 'phone' && this.state.phoneClicks === 1) {
      this.setState({
        grid: this.props.grid,
        online: true,
        onlineClicks: 0,
        phoneClicks: 0,
        phone: false,
        revert: !this.state.revert,
      }) 
    } else {
      this.setState({
        grid: this.props.grid,
        revert: !this.state.revert,
      }) 
    } 
  }

  bothAvailableUpdate(updatedCell){
    let grid = [...this.state.grid]
    let gridCopy = this.state.quotaGridCopy
    let row = updatedCell[0].row
    let originalTotalAvailToSend = gridCopy[row][7].value + gridCopy[row][6].value
    let branch = grid[row][10].value
    let val = Number(updatedCell[0].value)
    let prevVal = Number(grid[row][8].value)
    let amountBoth = grid[row][7].value
    let amountBothCopy = JSON.parse(JSON.stringify(amountBoth))
    let availToSend = grid[row][6].value
    let totalAvailToSend = amountBoth + availToSend
    if (this.state[branch]) amountBoth = this.state[branch]
    if (!this.state[branch]){
      this.setState({
        [branch]: amountBothCopy
      })
      grid[row][7] = {
        "value": amountBoth,
        "readOnly": true,
        "className": amountBothCopy.toString()
      }
    }
    let matchingBranchesWithVals = false
    let matchingBranchesTotalVals = 0
    grid.forEach((curRow, index) => {
      if (index !== row && index > 0 && curRow[10].value === branch && Number(curRow[8].value) !== 0){
        matchingBranchesWithVals = true
        matchingBranchesTotalVals += Number(curRow[8].value)
      }
    })
    let sendBothValLeft = 0
    let matchingBranchAmount = 1
    if (val >= totalAvailToSend) {
      amountBoth = 0
    } else if (val < 0){
      val = 0
      amountBoth = 0
    } else if (matchingBranchesWithVals){
      amountBoth = amountBoth - val
      amountBoth = amountBoth - matchingBranchesTotalVals
      if (Math.sign(amountBoth) === -1) amountBoth = amountBothCopy + amountBoth
      if (Math.sign(amountBoth) === -1) amountBoth = 0
    } else if (Math.sign(branch - val) === -1) {
      amountBoth = 0
    } else {
      amountBoth = originalTotalAvailToSend - val
    }
    if (amountBoth > this.state[branch]) amountBoth = this.state[branch]
    try {
      if (val === 0 && this.state[branch]) {
        let totalForAllBoth = this.state[branch]
        grid.forEach((curRow, index) => {
          if (index > 0 && curRow[10].value === branch){
            console.log(totalForAllBoth)
            curRow[7].value = amountBoth
          }
        })
        this.setState({
          grid: grid
        })
        return 0
      }
    } catch {

    }
    grid.forEach((curRow, index) => {
      if (index > 0 && index !== row && curRow[10].value === branch){
        if (curRow[7].value > 0){
          sendBothValLeft += curRow[7].value
          matchingBranchAmount += 1
        }
      }
    })
    try {
      grid[row][7] = {
        "value": amountBoth,
        "readOnly": true,
        "className": this.state[branch].toString()
      }

    } catch (err){
      console.log(err)
    }
    this.setState({
      grid: grid
    })
    grid.forEach((curRow, index) => {
      if (index > 0 && index !== row && curRow[10].value === branch){
          curRow[7].value = amountBoth
      }
    })
    if (val >= totalAvailToSend && matchingBranchesWithVals){
      if (Math.sign(val - matchingBranchesTotalVals) === 1 && val > prevVal && totalAvailToSend + val < prevVal) return prevVal
      if (Math.sign(val - matchingBranchesTotalVals) === 1 && val > prevVal && totalAvailToSend < prevVal) return prevVal + totalAvailToSend
      else if (Math.sign(val - matchingBranchesTotalVals) === 1 && totalAvailToSend < prevVal) return val
      else if (Math.sign(val - matchingBranchesTotalVals) === 1) return val - matchingBranchesTotalVals
      else if (amountBothCopy === 0) return availToSend
      else if (amountBothCopy > 0) return amountBothCopy + availToSend
      else return originalTotalAvailToSend
    } else if (matchingBranchesWithVals && matchingBranchesTotalVals + val > totalAvailToSend) {
      return val
    } else if (totalAvailToSend <= val){
      return totalAvailToSend
    } else {
      return val
    }
  }

  async surveySort(e){
    let gridIndex = 0;
    await this.props.getQuotas()
    _.remove(this.props.grid, (n) => {
      if (gridIndex > 0) {
        if (n[2].value !== e.target.text) {
          return n
        }
      }
      gridIndex += 1
    })
    this.setState({
      grid: this.props.grid,
      filters: this.props.filters
    })
  }

  async methodSortOnline(){
    await this.props.getQuotas()
    _.remove(this.props.grid, (n) => {
      if (n[1].value === "Phone") {
        return n
      }
    })
      this.setState({
        grid: this.props.grid,
        online: true,
        onlineClicks: this.state.onlineClicks + 1,
        phoneClicks: 0,
        phone: false
      })
  }

  async methodSortPhone(){
    await this.props.getQuotas()
    _.remove(this.props.grid, (n) => {
      if (n[1].value === "Online") {
        return n
      } 
    })
      this.setState({
        grid: this.props.grid,
        phone: true,
        phoneClicks: this.state.phoneClicks + 1,
        onlineClicks: 0,
        online: false
      })
  }

  selectHandler(e){
    this.setState({selected: e.target.value})
  }

  isSelected(e){
    this.setState({isSelected: e.target.value})
  }

  render() {
    return (
        <div class='quotaCardContainer' style={{display: 'inline-flex', width: '100%', marginBottom: 80}}>
          <Card className='quotaCard1'>
            <Card.Header style={{display: 'flex', justifyContent: 'center'}} className='quotaCardHeader1' >
              <div style={{display: 'inline-flex', width: '100%', justifyContent: 'space-evenly'}}>
                <QuotaMethodFilter 
                  onlineClicks={this.state.onlineClicks} 
                  phoneClicks={this.state.phoneClicks}  
                  refreshGrid={this.refreshGrid.bind(this)} 
                  handleOutsideClick={this.handleOutsideClick.bind(this)} 
                  methodSortPhone={this.methodSortPhone.bind(this)} 
                  methodSortOnline={this.methodSortOnline.bind(this)}
                />
                <QuotaSurveyFilter 
                  filters={this.state.filters}
                  grid={this.props.grid} 
                  refreshGrid={this.refreshGrid.bind(this)} 
                  revert={this.state.revert} 
                  surveySort={this.surveySort.bind(this)} 
                />
                <div
                style={{height: "45px", border: "2px solid white", borderRadius: 7}}
                >
                <input id='updateAllInput' value={this.state.sendTodayAll} onChange={(e)=> {
                    this.setState({
                      sendTodayAll: e.target.value
                    })
                  }}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      this.props.updateSendTodayAll(this.state.sendTodayAll)
                    }
                  }}
                />
                <Button id='updateAllBtn' onClick={e => {
                  console.log(e)
                  this.props.updateSendTodayAll(this.state.sendTodayAll)
                }}>
                Update All
                </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body style={{padding: '2rem 2rem 2.5rem 2rem', display: 'inline-flex'}}>
            <ReactDataSheet
              data={this.state.grid}
              // handleCopy={(e) => {return e.valueRenderer(e)}}
              onSelect={(e) => {
                this.props.updateGrid(e.start, e.end)
                }}
              valueRenderer={cell => cell.value}
              onCellsChanged={changes => {
                let grid = this.state.grid
                console.log(changes)
                let newVal = this.bothAvailableUpdate(changes)
                changes[0].value = newVal.toString()
                // const grid = this.state.grid.map(row => [...row]);
                changes.forEach(({ cell, row, col, value }) => {
                  cell.value = value
                  cell.forceComponent = true
                  // grid[row][col].value = value
                  grid[row][col] = { ...grid[row][col], value }; 
                });
              }}
            />
            </Card.Body>
            <div>
              <Alert id='quotaSendingNowAlert' show={this.state.sendQuotaSending} variant="warning"> Your interviews are sending! </Alert>
              <Alert id='quotaSendSuccessAlert' show={this.props.sendQuotaSuccess} variant="success"> Your interviews have successfully sent! </Alert>
              <Alert id='quotaSendFailureAlert' show={this.props.sendQuotaFail} variant="danger"> Your interviews did not send. Please review formatting. </Alert>
            </div>
              <Card.Footer style={{height: 'auto'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <small style={{float: 'right'}} className="text-muted">
                  Last updated at {this.props.timeOfLastQuotaRefresh}
                </small>
                <Button  id='quotaSubmit' style={{backgroundColor: '#233d4f'}} onClick={() => {
                  this.setState({
                    sendQuotaSending: true
                  }) 
                  this.props.sendToVendors(this.state.grid)
                }}>
                Send
                </Button>
              </div>
              </Card.Footer>
            </Card>
        </div>
    )
  }
}

export default (QuotaCards) 

