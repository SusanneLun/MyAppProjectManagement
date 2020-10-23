import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class StrategiesOption extends Component {

render() {
const { option } = this.props.option

  return(
    <div>
    <Form>
    <div class="ui checkbox">
    <input type="checkbox" />
      <label>{option}</label>
    </div>
    </Form>
    </div>
  )
}
}

export default StrategiesOption
