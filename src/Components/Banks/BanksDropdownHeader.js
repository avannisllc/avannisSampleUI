import React from 'react';
import Select from 'react-select';
import { ProgressBar } from 'react-bootstrap'
import './../../App.css';
class BanksDropdownHeader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      banks: this.props.allBanks, 
      value: 'Select a bank',
      options: [],
      loadAmount: this.props.loadAmount,
      loadingShow: this.props.loadingShow
    }
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.allBanks !== this.props.allBanks) {
        this.state.options.splice(0, this.state.options.length)
        this.props.allBanks.map((bank, index) => {
          let obj = {label: bank.formatted_bank_name, name: bank.bank_name, id: bank.bank_name + index}
          this.state.options.push(obj) 
          return true
        })
      }  
      if (prevProps.loadAmount !== this.props.loadAmount && this.props.loadAmount === 50){
        // setTimeout(() => {this.props.setLoadedBar()}, 1000)
        return true
      } 
      if (prevProps.loadAmount !== this.props.loadAmount && this.props.loadAmount === 100){
        setTimeout(() => {document.getElementById('progressBar').style.zIndex = -10}, 800)
        setTimeout(() => {this.props.unSetLoadedBar()}, 1000)
        return true 
      } 
      if (prevProps === this.props) {
        return false
      }
    } 

  render () {
    let results = "Results (" +  this.props.allBanks.length + ")"
    return (
      <div style={{maxWdth: 500, marginLeft: 150}} className="bankDropdownContainer">
        <div className="row" style={{marginRight: 0, display: 'inline-flex', flexDirection: 'row'}}>
          <div 
            style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center'}} 
          >
            <div className='resultsDiv' style={{fontWeight: 'bold', color: 'white', marginBottom: 5, marginTop: 5}}>
            </div>

              <Select 
                id='dropdownSelector'
                styles={{marginTop: 10}}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors
                  },
                })} 
                placeholder={results} 
                options={this.state.options} 
                onChange={(e) => {
                  this.props.selectedBank(e, e.label)
                  this.props.fetchBanks(e)
                  document.getElementById('progressBar').style.zIndex = 0
                }}
              
              />
              <div style={{marginLeft: 20, marginBottom:10}}>
                <ProgressBar id='progressBar' animated now={this.props.loadAmount} />
              </div>
            </div>
        </div>
        
      </div>
    )
  }
}
  export default (BanksDropdownHeader); 