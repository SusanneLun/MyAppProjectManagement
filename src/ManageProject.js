import React, { Component } from 'react'
import { Container, Form, Select, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import APILogin from './APILogin'


class ManageProject extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      description: ""
    }
  }


    handleChange = (event, value) => {
    this.setState({ [event.target.name]: event.target.value })
    }

  componentDidMount() {
    const { id } = this.props.match.params
    APILogin.getUserProject(id)
    .then(project => this.setState({name: project.name,
    description: project.description}))

    }

      handleSubmit = (project, updatedValues) => {
        const { match: { params } } = this.props

        let updatedValue = {
          name: updatedValues.name === "" ? project.name : updatedValues.name,
          description: updatedValues.description === "" ? project.description : updatedValues.description,
          id: params.id
      }

        fetch(`http://localhost:3000/user_project/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( updatedValue ),
        }).then(res => res.json())
        .then(project => {
          this.setState({
            name: project.name,
            description: project.description
            })})
      }

render() {
  const { id } = this.props.match.params
  return (
    <div>
    <Form onSubmit={() => this.handleSubmit(id, this.state)} style={{marginLeft: 50, top: 80}}>
    <h3>View And Edit Project</h3>
    <Form.Group widths='equal' >
      <Form.Input  name="name" fluid label="Name" type="text" onChange={event => this.handleChange(event)} value={this.state.name} />
      <Form.Input name="description" fluid label='Description' rows="5" type="text" onChange={this.handleChange}  value={this.state.description}/>
    </Form.Group>

    <div className={"new_stakeholder_submit"}>
    <Form.Button type="submit"  color="purple"> Update Project </Form.Button>
    <Form.Button type="delete"  color="red" onClick={() => this.handleDelete(id)}> Delete Project </Form.Button>
    </div>
    </Form>

    </div>
  )
}

}


export default ManageProject
