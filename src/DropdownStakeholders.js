import React, { Component } from 'react'
import { Dropdown, Form, Select } from 'semantic-ui-react'



class DropdownStakeholders extends Component {
constructor() {
  super()
  this.state = {
    id: "",
    name: ""
  }
}


  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value })
  }


render() {

  const options = this.props.stakeholders.map(stakeholder => stakeholder.name)

  return(
  <div>
  <Form.Group widths='equal' >
    <div className={"new_stakeholder_input"}>
      <label>Select Stakeholder</label>
      <Select name="name" text={options} label="Name" options={options}
        placeholder="Select" value={this.state.name}
        onChange={this.handleChange} />
    </div>
  </Form.Group>
  </div>
)}
}

//
// class DynamicSelect extends Component{
//     constructor(props){
//         super(props)
//     }
//
//     //On the change event for the select box pass the selected value back to the parent
//     handleChange = (event) =>
//     {
//         let selectedValue = event.target.value;
//         this.props.onSelectChange(selectedValue);
//     }
//
//     render(){
//         let arrayOfData = this.props.arrayOfData;
//         let options = arrayOfData.map((data) =>
//                 <option
//                     key={data.id}
//                     value={data.id}
//                 >
//                     {data.name}
//                 </option>
//             );
//
//             return (
//             <select name="customSearch" className="custom-search-select" onChange={this.handleChange}>
//                 <option>Select Item</option>
//                 {options}
//            </select>
//         )
//     }
// }


export default DropdownStakeholders
