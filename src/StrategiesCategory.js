import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import StrategiesOption from './StrategiesOption'



class StrategiesCategory extends Component {

  constructor() {
        super()
        this.state = {
          value: ''
        }
     }

  // unCheck(i){
  //       let ref = 'ref_' + i;
  //       this.refs[ref].checked = !this.refs[ref].checked;
  //    }

render() {
  const { name, strategies } = this.props.category


  return (

  <div>
  <Form >
  <h3>{name}</h3>
  <div>
  <label>Strategies:
  <p>
    {strategies.map(strategies =>
      <StrategiesOption
      strategies={strategies}
    />)}
  </p>
  </label>
  </div>
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
