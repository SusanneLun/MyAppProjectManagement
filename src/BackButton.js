import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const BackButton = () => {

return (

  <div>
  <Button onClick={this.props.history.goBack}>Back</Button>
  </div>
)

}

export default withRouter(BackButton)
