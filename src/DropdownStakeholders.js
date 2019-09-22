import React, { Component } from 'react'
import { Dropdown, Form, Select } from 'semantic-ui-react'



class DropdownStakeholders extends Component {
constructor() {
  super()
  this.state = {
    name: ""
  }
}

handleChange = (event, data) => {
  this.setState({ [data.name]: data.value })
}


render() {

  const options = this.props.stakeholders.map(stakeholder => {return {name: stakeholder.name}})

  return(
  <div>
  <Form.Group widths='equal' >
    <div className={"new_stakeholder_input"}>
      <label>Select Stakeholder</label>
      <Select name="name" label="Name" type="text" options={options}
          placeholder="Select" value={this.state.name}
              onChange={this.handleChange}  />
    </div>
  </Form.Group>

  </div>
)}
}

export default DropdownStakeholders
