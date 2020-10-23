import React, { Component } from 'react';
import { Button, Card, Select } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const ratingOptions = [
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


class StakeholderSupport extends Component {
  constructor() {
    super()
    this.state = {
      positivity: '',
      option: '',
      strategy: ''
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
    positivity: ''
  })
}


assignStrategy = (stakeholder, newStrategy) => {
  let assStrategy = {
    strategy: stakeholder.strategy,
    project_id: this.props.match.params.id
  }

  fetch(`http://localhost:3000/stakeholders/${stakeholder.id}/strategies`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    {
      strategy: this.state.stakeholder.strategy,
      project_id: this.props.match.params.id
    }
)
}).then(res => res.json())
.then(res => this.props.addNewStrategy(res))
.then(this.setState({
  strategy: this.state.stakeholder.strategy
}
))
}



render() {

  const { name, alias, title, id, ratings, strategies } = this.props.stakeholder


  return (


    <Card color='purple' className={"stakeholder_card"}>
      <Card.Content >
        <Card.Header key={id}>
          <Link to={"/manage_stakeholder/" + id}>{name}</Link>
          <Card.Meta>
            <span className='date'> {alias}</span>
          </Card.Meta>
          <Card.Description>{title}</Card.Description>
        </Card.Header>

        </Card.Content>
          <div className={"stakeholder_card__input"}>
            <label> Support Score: {ratings && ratings[ratings.length -1].positivity}</label>
            <Select  name="positivity" placeholder="Select" options={ratingOptions}
             onChange={this.handleNumChange} value={this.state.positivity} />
          </div>
          <div className={"stakeholder_card__submit"}>
            <Button compact color='purple' onClick={this.onHandleRating}> Save Rating </Button>
          </div>


        <Card.Content extra>
        <div>
          <label> Strategies:
          </label>

        </div>
    </Card.Content>
  </Card>

  )

}
}

export default StakeholderSupport;
