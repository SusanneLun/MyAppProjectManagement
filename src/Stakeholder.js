import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class Stakeholder extends Component {
  constructor() {
    super()
    this.state = {
      power: '',
      interest: '',
      positivity: ''
    }
    }

ratingField = (event) => {
  const newRatings = event.target.value
    this.setState({
      [event.target.name]: newRatings
    })
  }

onHandleRating = (event) => {
  this.props.handleRating(this.props.stakeholder, this.state)
  this.setState({
    power: '',
    interest: '',
    positivity: ''
  })
}

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

render() {
  const { name, title, alias, ratings } = this.props.stakeholder
  const stakeholder_id = this.props.id
  const id = this.props.project_id

  return (

    <Card color='purple' className={"stakeholder_card"}>
      <Card.Content >
        <Card.Header key={id} >
          <Link to={`/manage_stakeholder/${stakeholder_id}/project/${id}`}>{name}</Link>
          <Card.Meta>
            <span className='date'> {alias}</span>
          </Card.Meta>
          <Card.Description>{title}</Card.Description>
        </Card.Header>

        </Card.Content>
          <div className={"stakeholder_card__input"}>
            <label> Power Score: {ratings && ratings[ratings.length -1].power}</label>
            <input type="text-field"
              placeholder='Change..'
              name="power" value={this.state.power}
              onChange={this.ratingField}/>
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

        <Card.Content extra>
    </Card.Content>
  </Card>

  )

}
}

export default Stakeholder;
