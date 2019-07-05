import React, { Component } from 'react';
import Stakeholder from './Stakeholder'


class StakeholderContainer extends Component {


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

export default StakeholderContainer
