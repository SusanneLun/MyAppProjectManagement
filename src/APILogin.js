import React, { Component } from 'react'

class APILogin extends Component {

static init () {
    this.baseURL = 'http://localhost:3000'
    this.signinURL = this.baseURL + '/signin'
    this.projectStakeholdersURL = `http://localhost:3000/project_stakeholders`
  }

static signin (user)  {
    return fetch(this.signinURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
  }).then(resp => resp.json())
  }

static validate () {
    return this.get('http://localhost:3000/validate')
  }

static getUserProjects () {
  return this.get(`http://localhost:3000/user_projects`)
}

static getSupportRatings () {
  return this.get(`http://localhost:3000/stakeholders`)
}

static getCategories () {
  return this.get(`http://localhost:3000/categories`)
}

static getStrategies () {
  return this.get(`http://localhost:3000/strategies`)
}

static getStakeholderProjectInfo (stakeholder_id, id) {
  return this.get(`http://localhost:3000/stakeholder_project_info/${stakeholder_id}/${id}`)
}

static getProjectStakeholders (id) {
  return fetch(this.projectStakeholdersURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({project_id: id})
}).then(resp => resp.json())
}


static get (url) {
      const token = localStorage.getItem('token')
      return fetch(url, {
        headers: {'Authorization': token},
      }).then(resp => resp.json())
    }

static createUser (user) {
      return fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }).then(resp => resp.json())
      .then(console.log('hep'))
    }

}



APILogin.init()

export default APILogin
