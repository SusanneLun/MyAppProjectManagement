import React, { Component } from 'react'
import APILogin from './APILogin'
import Project from './Project'
import NewProject from './NewProject'
import { Button } from 'semantic-ui-react'
import App from './App.css'
import ManageProject from './ManageProject'


class UserProjects extends Component {
  constructor() {
    super()
  this.state = {
    projects: [],
    showNewProjectForm: false
  }
}

showForm = (event) =>
this.setState({
  showNewProjectForm:
  !this.state.showNewProjectForm
})


hideForm = (event) =>
this.setState({
  showNewProjectForm: false
})
// showForm = (event) {
//   #create-project.visible {
//     display: "flex";
//   }

addNewProject = (project) => {
  let newProjectState = [...this.state.projects, project]
  this.setState({
    projects: newProjectState,
  })
}


getUserProjects = () => {
  if (this.props.user) {
    APILogin.getUserProjects()
    .then(projects => this.setState({ projects }))
  }
}


componentDidMount () {
    this.getUserProjects()
}

render () {
  const { projects } = this.state

  return (
    <div>
      <div className="projects_header">
      <h3>YOUR PROJECTS</h3>
      </div>
    <div className='project_list'>

      { projects.length === 0 && <p>You have not registered any projects yet.
        Please click on Create New Project to register your first project.</p>}
      {
        projects.map(project =>
          <Project key={project.id} project={project} />)
      }

          <NewProject user={this.props.user} addNewProject={this.addNewProject}
          showNewProjectForm={this.state.showNewProjectForm} showForm={this.showForm}
          hideForm={this.hideForm}/>

    </div>
    <div id="new_project_button">
    <Button className="ui toggle button" onClick={this.showForm} color="purple" >
    Create New Project
    </Button>
    </div>
    </div>
  )
}
}



export default UserProjects
