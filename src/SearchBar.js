import React from 'react'
import { Input } from 'semantic-ui-react'

const SearchBar = props =>
  <div id="chart-page" className={"search_form"}>
    <Input size='big' icon="search" placeholder="Search..." onChange={event => props.updateFilter(event.target.value)}/>
  </div>

export default SearchBar
