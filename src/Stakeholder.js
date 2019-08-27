import React, { Component } from 'react';
import { Button, Card, Select, Form } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'


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

class Stakeholder extends Component {
  constructor() {
    super()
    this.state = {
      power: '',
      interest: '',
      positivity: '',
      redirect: false
    }
    }

ratingField = (event) => {
  const newRatings = event.target.value
    this.setState({
      [event.target.name]: newRatings
    })
  }

handleNumChange = (event, data) => {
  this.setState({ [data.name]: data.value })
}

onHandleRating = (event) => {
  this.props.handleRating(this.props.stakeholder, this.state)
  this.setState({
    power: '',
    interest: '',
    positivity: ''
  })
}
//
// viewStakeholder = (event) => {
//   const stakeholder_id = this.props.stakeholder.id
//   const project_id = this.props.project_id
//
//  return `/manage_stakeholder/${stakeholder_id}/project/${project_id}`
// }

// newStakeholder = (event) => {
//   event.preventDefault()
//   fetch(railsAPI, {
//     method: POST,
//     headers : new Headers(),
//     body:JSON.stringify,
//     name: ,
//     title: ,
//     alias: ,
//     power: ,
//     interest: ,
//     positivity:
//   })
//       (res.json => res.json)
//       .then(console.log 'Done')
//
// }


viewStakeholder = (event) => {
  // some action...
  // then redirect
  this.setState({redirect: true});
}

render() {
  const { name, title, alias, ratings } = this.props.stakeholder
  const stakeholder_id = this.props.stakeholder.id
  const id = this.props.project_id

  if (this.state.redirect) {
    return <Redirect push to={`/manage_stakeholder/${stakeholder_id}/${id}`} />;
  }

  return (

    <Card color='purple' className={"stakeholder_card"}>
      <Card.Content >
        <Card.Header >
          <Link to={`/manage_stakeholder/${stakeholder_id}/${id}`}>{name}</Link>
          <Card.Meta>
            <span className='date'> {alias}</span>
          </Card.Meta>
          <Card.Description>{title}</Card.Description>
        </Card.Header>

        </Card.Content >
        <Form.Group widths='equal'>
          <div className={"stakeholder_card__input"}>
            <label> Power Score: {ratings && ratings[ratings.length -1].power}</label>
            <Select name="power"
              type="number"
              options={options}
              placeholder='Change..'
              onChange={this.handleNumChange}
              value={this.state.value}
              />
          </div>
          <div className={"stakeholder_card__input"}>
            <label> Interest Score: {ratings && ratings[ratings.length -1].interest}</label>
            <input
              type="text-field"
              placeholder='Change..'
              name="interest"
              value={this.state.interest}
              onChange={this.ratingField} />
          </div>
          <div className={"stakeholder_card__submit"}>
            <Button compact color='purple' onClick={this.onHandleRating}> Save Rating </Button>
          </div>
          <div className={"stakeholder_card__submit"}>
          <Button compact color='purple' onClick={this.viewStakeholder}>View</Button>
          </div>
          </Form.Group>

        <Card.Content extra>
    </Card.Content>
  </Card>

  )

}
}

export default Stakeholder;
