import React, { Component } from 'react'
import { Dropdown, Form, Select } from 'semantic-ui-react'



class DropdownStakeholders extends Component {
constructor() {
  super()
  this.state = {
    name: ""
  }
}


render() {
  
  const options = this.props.stakeholders.name


  return(
  <div>
  <Form.Group widths='equal' >
    <div className={"new_stakeholder_input"}>
      <label>Select Stakeholder</label>
      <Select name="name" label="Name" type="text" options={options}
          placeholder="Select"
              onChange={this.handleNumChange} value={this.state.value} />
    </div>
  </Form.Group>

  </div>
)}
}

export default DropdownStakeholders
