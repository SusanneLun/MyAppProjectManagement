import React, { Component } from 'react'
import { Form, Button, Checkbox } from 'semantic-ui-react'


class StrategiesOption extends Component {



render() {
const { option } = this.props.strategies

  return(
    <div>
    <div class="ui checkbox">
    <input type="checkbox"/>
    <label>{option}</label>
    </div>
    </div>
  )
}
}




export default StrategiesOption


// <div class="ui checkbox">
//   <input type="checkbox" tabindex="0" class="hidden">
//   <label>Label</label>
// </div>
