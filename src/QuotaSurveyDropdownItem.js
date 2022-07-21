import React from 'react'
import { Dropdown } from 'react-bootstrap'

class QuotaSurveyDropdownItem extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      filterNames: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filters !== this.props.filters){
      let arr = []
      this.setState({
        filterNames: arr
      })
      return true
    } else {
      return false
    }
  }

  render() {
    return (
      <div>
        {this.props.filters.map((filter, index) => {
          let eKey = "Filter: "
          let filterName = filter
          let uuid = filter + index
          let eKeyName = eKey + filterName.toUpperCase();
          return <Dropdown.Item key={uuid} id='filterOption1' onClick={(e) => this.props.surveySort(e)} eventKey={eKeyName}>{filterName}</Dropdown.Item>
        })
        }
      </div>
    )
  }
}

export default (QuotaSurveyDropdownItem)
