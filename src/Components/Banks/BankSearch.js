import React from 'react'

class BankSearch extends React.Component {
  state={
    name: '',
    smkey: ''
  }
  render(props) {
    return (
      <div>
        <input
          class='searchImports'
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              this.props.fetchBanks(this.state.name, this.state.smkey)
              }
            }}
          onChange={e => 
            this.setState({
              smkey: e.target.value
              })
            }
          placeholder="Secret Manager Key"
          value={this.state.smkey}
        />
        <input 
          class='searchImports'
          id='searchImportBankName'
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              this.props.fetchBanks(this.state.name, this.state.smkey)
              }
            }}
          onChange={e => 
            this.setState({
              name: e.target.value
              })
            }
          placeholder="Bank Name"
          value={this.state.name}
        /> 
        <button 
        class='searchBanks'
        onClick={(e) => 
          this.props.fetchBanks(this.state.name, this.state.smkey)
          }
        >Search Banks</button>
      </div>
    )
  }
}

export default (BankSearch)