import React, { Component } from 'react'
import { Form, Select } from 'semantic-ui-react'
import Stakeholder from './Stakeholder'



class NewStrategyAssign extends Component {

  constructor() {
    super()
      this.state = {
        stakeholders: [],
        strategy: ""

      }
    }

      render() {
        const filteredStakeholders = this.props.stakeholders
        .filter(stakeholder => stakeholder.name && stakeholder.name.toLowerCase().includes(this.props.filter.toLowerCase()))
        return (
        <div className="ui-container stakeholders_list" id="chart-page">
          {
            filteredStakeholders.map(stakeholder =>
              <Stakeholder stakeholder={stakeholder}
                key={stakeholder.name}
                handleRating={this.props.handleRating}
                selectStakeholder={this.props.selectStakeholder}
                />)
          }
          </div>
)
}
}

export default NewStrategyAssign
