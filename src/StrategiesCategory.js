import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import StrategiesOption from './StrategiesOption'


class StrategiesCategory extends Component {


render() {
  const { name, strategies } = this.props.category

  return (

  <div>
  <Form >
  <h3>{name}</h3>
  {
    strategies.map(option =>
    <StrategiesOption option={option} />)
  }
  <p>
  </p>
  <div className={"strategy_add__submit"} >
    <Button compact color='purple' >Add strategy</Button>
  </div>
  </Form>
  </div>
)
}
}

export default StrategiesCategory
