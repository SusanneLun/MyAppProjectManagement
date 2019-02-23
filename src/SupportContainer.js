import React, { Component } from 'react'
import StakeholderSupport from './StakeholderSupport'


class SupportContainer extends Component {

  render() {

  return (

    <div className="ui-container stakeholders_list" id="chart-page">
      {
      this.props.stakeholders.map(stakeholder =>
          <StakeholderSupport stakeholder={stakeholder}
            key={stakeholder.name}
            handleRating={this.props.handleRating}
            selectStakeholder={this.props.selectStakeholder}
            />)
      }

    </div>
  )
}
}

export default SupportContainer
