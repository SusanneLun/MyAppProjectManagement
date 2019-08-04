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
      description: "",
      project: ""
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    APILogin.getUserProject(id)
    .then(project => this.setState({name: project.name,
    description: project.description}))

    }

render() {
  return (
    <div>
    {project.name}
    {project.description}
    </div>
  )
}

}


export default ManageProject
