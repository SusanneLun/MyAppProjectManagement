import React from 'react'
import { Form, Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const Project = ({ project }) => {


return (
  <Card color='purple' className={"stakeholder_card"}>
    <Card.Content >
      <Card.Header>
        {project.name}
        <p></p>
        <Card.Description className="project_description">
        {project.description}
        </Card.Description>
        <p></p>
        <Link to={`/PI_Chart/${project.id}`}>
        <Button compact color='purple'>
        View PI Chart </Button>
        </Link>
        <Link to={`/support/${project.id}`}>
        <p></p>
        <Button compact color='purple'>
        View Support Chart </Button>
        </Link>
      </Card.Header>
    </Card.Content>
  </Card>

)
}




export default Project
