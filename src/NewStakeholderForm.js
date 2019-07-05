import React, { Component } from 'react'
import { Form, Select } from 'semantic-ui-react'

const options = [
  { key: "1", text: '1',value: 1 },
  { key: "2", text: '2',value: 2 },
  { key: "3", text: '3', value: 3 },
  { key: "4", text: '4', value: 4 },
  { key: "5", text: '5', value: 5 },
  { key: "6", text: '6', value: 6 },
  { key: "7", text: '7', value: 7 },
  { key: "8", text: '8', value: 8 },
  { key: "9", text: '9', value: 9 },
  { key: "10", text: '10', value: 10 },
]

class NewStakeholderForm extends Component {
constructor() {
  super();
  this.state = {
    name: "",
    title: "",
    alias: "",
    note: "",
    power: 0,
    interest: 0,
    positivity: 0
  };
}


handleChange = (event, value) => {
this.setState({ [event.target.name]: event.target.value })
}

handleNumChange = (event, data) => {
  this.setState({ [data.name]: data.value })
}



  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/stakeholders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        name: this.state.name,
        title: this.state.title,
        alias: this.state.alias,
        note: this.state.note,
        power: this.state.power,
        interest: this.state.interest,
        positivity: this.state.positivity,
        project_id: this.props.project_id
      }
      )
    }).then(res => res.json())
    .then(res => this.props.addNewStakeholder(res))
    .then(this.setState({
      name: "",
      title: "",
      alias: "",
      note: "",
      power: 0,
      interest: 0,
      positivity: 0
    }))

  }

  // updateFilter = newFilter => {
  //   this.setState({
  //     filter: newFilter
  //   })
  // }



render() {
  
// const { value } = this.state
return (
<div id="create-stakeholder">
  <Form onSubmit={this.handleSubmit}>
    <h3>Create New Stakeholder</h3>
    <Form.Group widths='equal' >
      <Form.Input name="name" fluid label='Name' type="text" onChange={event => this.handleChange(event)} placeholder="Name" value={this.state.value} />
      <Form.Input name="title" fluid label='Title' type="text" onChange={this.handleChange} placeholder="Title" value={this.state.value}/>
      <Form.Input name="alias" fluid label='Alias' type="text" onChange={this.handleChange} placeholder="Alias" value={this.state.value}/>
    </Form.Group>

    <Form.Group widths='equal' >
      <div className={"new_stakeholder_input"}>
        <label>Power Rating</label>
        <Select name="power" label="Power Rating" type="number" options={options}
            placeholder="Select"
                onChange={this.handleNumChange} value={this.state.value} />
      </div>


      <div className={"new_stakeholder_input"}>
        <label>Interest Rating</label>
        <Select name="interest" label='Interest Rating' placeholder="Select"
                onChange={this.handleNumChange} options={options} value={this.state.value}/>
      </div>

      <div className={"new_stakeholder_input"}>
        <label> Support Rating </label>
        <Select name="positivity" label='Positivity Rating' placeholder="Select" onChange={this.handleNumChange} options={options} />
      </div>

    </Form.Group>

    <div className={"new_stakeholder_submit"}>
      <Form.Button type="submit" color="purple" > Save Stakeholder </Form.Button>
    </div>
  </Form>
</div>

  );
}
}

export default NewStakeholderForm;
