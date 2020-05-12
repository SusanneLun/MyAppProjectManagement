import React, { Component } from 'react'
import StakeholderSupport from './StakeholderSupport'


class SupportContainer extends Component {

  render() {
    const filteredStakeholders = this.props.stakeholders
    .filter(stakeholder => stakeholder.name && stakeholder.name.toLowerCase().includes(this.props.filter.toLowerCase()))
    return (
    <div className="ui-container stakeholders_list" id="chart-page">
      {
        filteredStakeholders.map(stakeholder =>
          <StakeholderSupport stakeholder={stakeholder}
            key={stakeholder.name}
            handleRating={this.props.handleRating}
            selectStakeholder={this.props.selectStakeholder}
            project_id={this.props.project_id}
            />)
      }

    </div>
  )
}
}

export default SupportContainer
