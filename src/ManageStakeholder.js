import React, { Component } from 'react'
import { Container, Form, Select, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import APILogin from './APILogin'


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

class ManageStakeholder extends Component {
  constructor() {
    super()
      this.state = {
        name: "",
        title: "",
        alias: "",
        note: "",
        power: "",
        interest: "",
        positivity: ""

    }
  }



  componentDidMount() {

     const { match: { params } } = this.props

    APILogin.getStakeholderProjectInfo(params.stakeholder_id, params.project_id)
      .then(stakeholder => this.setState({
        name: stakeholder.stakeholder.name,
        alias: stakeholder.stakeholder.alias,
        title: stakeholder.stakeholder.title,
        note: stakeholder.stakeholder.note,
        power: stakeholder.ratings[stakeholder.ratings.length -1].power,
        interest: stakeholder.ratings[stakeholder.ratings.length -1].interest,
        positivity: stakeholder.ratings[stakeholder.ratings.length -1].positivity
          })
      )
}


  handleChange = (event, value) => {
  this.setState({ [event.target.name]: event.target.value })
  }

  handleNumChange = (event, data) => {
    this.setState({ [data.name]: data.value })

  }

  handleSubmitRatings = (stakeholder, updatedValues) => {
    const { match: { params } } = this.props

    let updatedValue = {
      power: updatedValues.power === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].power : updatedValues.power,
      interest: updatedValues.interest === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].interest : updatedValues.interest,
      positivity: updatedValues.positivity === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].positivity : updatedValues.positivity,
      project_id: params.project_id
  }

    fetch(`http://localhost:3000/stakeholders/${params.stakeholder_id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( updatedValue ),
    }).then(res => res.json())
    .then(stakeholder => {
      this.setState({ power: stakeholder.ratings[stakeholder.ratings.length -1].power,
        interest: stakeholder.ratings[stakeholder.ratings.length -1].interest,
        positivity: stakeholder.ratings[stakeholder.ratings.length -1].positivity,
        project_id: params.project_id
      })})
  }



  handleSubmit = (stakeholder, updatedValues) => {

    const { match: { params } } = this.props

    let updatedValue = {
      name: updatedValues.name === "" ? stakeholder.stakeholder.name : updatedValues.name,
      title: updatedValues.title === "" ? stakeholder.stakeholder.title : updatedValues.title,
      alias:  updatedValues.alias === "" ? stakeholder.stakeholder.alias : updatedValues.alias,
      note:  updatedValues.note === "" ? stakeholder.stakeholder.note : updatedValues.note,
      power: updatedValues.power === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].power : updatedValues.power,
      interest: updatedValues.interest === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].interest : updatedValues.interest,
      positivity: updatedValues.positivity === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].positivity : updatedValues.positivity,
      project_id: params.project_id
  }

    fetch(`http://localhost:3000/stakeholders/${params.stakeholder_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( updatedValue ),
    }).then(res => res.json())
    .then(stakeholder => {
      this.setState({
        name: stakeholder.name,
        alias: stakeholder.alias,
        title: stakeholder.title,
        note: stakeholder.note,
        power: stakeholder.ratings[stakeholder.ratings.length -1].power,
        interest: stakeholder.ratings[stakeholder.ratings.length -1].interest,
        positivity: stakeholder.ratings[stakeholder.ratings.length -1].positivity,
        strategy: stakeholder.strategy,
        project_id: params.project_id})})
  }



handleDelete = (stakeholder, project) => {
  const { match: { params } } = this.props

  fetch(`http://localhost:3000/stakeholder_project_info/${params.stakeholder_id}/${params.project_id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ stakeholder, project })
  })
  .then(() => this.props.history.go(-1))
}


render() {

  const { match: { params } } = this.props


return (
<div >
  <Form  onSubmit={() => this.handleSubmit(params.project_id, this.state)} style={{marginLeft: 50, top: 80}}>
  <p></p>
  <p></p>
  <h3>View And Edit Stakeholder</h3>
  <Form.Group widths='equal' >
    <Form.Input  name="name" fluid label="Name" type="text" onChange={event => this.handleChange(event)} value={this.state.name} />
    <Form.Input name="title" fluid label='Title' type="text" onChange={this.handleChange}  value={this.state.title}/>
    <Form.Input name="alias" fluid label='Alias' type="text" onChange={this.handleChange}  value={this.state.alias}/>
    <Container>
    <Form.Input name="note" fluid label='My Notes' type="text" rows="5" onChange={this.handleChange} value={this.state.note} />
    </Container>
    <Container>
    <div>
    <label> Strategies:
    <p>

    </p>
    </label>
    </div>
    </Container>
    </Form.Group>
    <p>Power Rating</p>
    <Select name="power" label="Power Rating" placeholder="Select" options={options}
     onChange={this.handleNumChange} value={this.state.power} />
    <p>Interest Rating</p>
    <Select name="interest" label='Interest Rating' placeholder="Select"
    onChange={this.handleNumChange} options={options} value={this.state.interest}/>
    <p>Support Rating</p>
    <Select name="positivity" label='Positivity Rating' placeholder="Select"
    onChange={this.handleNumChange} options={options} value={this.state.positivity}/>
    <p></p>
    <div className={"new_stakeholder_submit"}>
    <Form.Button type="submit"  color="purple"> Update Stakeholder </Form.Button>
    <Form.Button type="delete"  color="red" onClick={() => this.handleDelete(params.project_id, this.state)}> Delete Stakeholder </Form.Button>
    </div>
</Form>

</div>

  );
}
}

export default ManageStakeholder;
