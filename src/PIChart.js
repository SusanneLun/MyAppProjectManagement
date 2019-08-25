import React, { Component } from 'react';
import StakeholderContainer from './StakeholderContainer'
import SearchBar from "./SearchBar"
import Stakeholder from './Stakeholder'
import NewStakeholderForm from './NewStakeholderForm'
import './App.css';
import AnyChart from 'anychart-react'
import anychart from 'anychart'
import APILogin from './APILogin'
import ManageStakeholder from './ManageStakeholder'
import chartData from './ChartData'



const quarters = {
  rightTop: {
    title: {
      text: 'Manage Closely',
      fontColor: '#ff8f00',
      padding: 10
    }
  },
  rightBottom: {
    title: {
      text: 'Keep Informed',
      fontColor: '#ff8f00',
      padding: 10
    }
  },
  leftTop: {
    title: {
      text: 'Keep Satisfied',
      fontColor: '#ff8f00',
      padding: 10
    }
  },
  leftBottom: {
    title: {
      text: 'Monitor',
      fontColor: '#ff8f00',
      padding: 10
    }
  }
}


class PIChart extends Component {
constructor() {
  super()
    this.state = {
      stakeholders: [],
      filter: '',
      selectedStakeholder: null,
      chartData: null
    }
}


addNewStakeholder = (stakeholder) => {
  let newStakeholderState = [...this.state.stakeholders, stakeholder]
  this.setState({
    stakeholders: newStakeholderState,
    chartData: newStakeholderState.map(stakeholder => { return {x: stakeholder.ratings[stakeholder.ratings.length -1].interest,
    value: stakeholder.ratings[stakeholder.ratings.length -1].power,
    name: stakeholder.name}})
  })
}

addStakeholderFields = (event) => {
  const newValues = event.target.value
    this.setState({
      [event.target.name]: newValues
    })
  }

  updateFilter = newFilter => {
    this.setState({
      filter: newFilter
    })
  }

deselectStakeholder = () => {
  this.setState({
    selectedStakeholder: null
  })
}

selectStakeholder = (stakeholder) => {
  this.setState({
    selectedStakeholder: stakeholder
  })
}

updateStakeholder = (stakeholder, updatedRatings) => {
  let updatedStakeholder = {
    name: updatedStakeholder.name === "" ? stakeholder.name : updatedStakeholder.name,
    title: updatedStakeholder.title === "" ? stakeholder.title : updatedStakeholder.title,
    alias: updatedStakeholder.alias === "" ? stakeholder.alias : updatedStakeholder.alias,
    note: updatedStakeholder.note === "" ? stakeholder.note : updatedStakeholder.note
  }
  let updatedRating = {
    power: updatedRatings.power === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].power : updatedRatings.power,
    interest: updatedRatings.interest === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].interest : updatedRatings.interest,
    positivity: stakeholder.ratings[stakeholder.ratings.length - 1].positivity
  }
}

handleRating = (stakeholder, newRatings) => {

  // let newRating = { // add a new ratings object
  //   ...newRatings, // first take all the new ratings we got passed as arguments
  //   ...stakeholder.ratings[ // fill it with any other ratings we had in the past
  //     stakeholder.ratings.length-1 // the latest rating is at the last index in the array
  //   ]
  // }

 let newRating = {
   power: newRatings.power === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].power : newRatings.power,
   interest: newRatings.interest === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].interest : newRatings.interest,
   positivity: stakeholder.ratings[stakeholder.ratings.length - 1].positivity,
   project_id: this.props.match.params.id
 }

  // delete newRating.id
  // delete newRating.created_at
  // delete newRating.updated_at


  fetch(`http://localhost:3000/stakeholders/${stakeholder.id}/ratings`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify( newRating ),
}).then(res => res.json())
  .then(stakeholderToUpdate => {
    // clone currrent state
    let newStakeholdersState = [...this.state.stakeholders]
    // find index of stakeholder with stakeholderToUpdate.id
    // console.log(stakeholderToUpdate)
    const indexToUpdate = newStakeholdersState.findIndex(stakeholder => stakeholder.id === stakeholderToUpdate.id)
    // replace that whole stakeholder object with the new stakeholderToUpdate
    newStakeholdersState[indexToUpdate] = stakeholderToUpdate
    this.setState({
      stakeholders: newStakeholdersState,
      chartData: newStakeholdersState.map(stakeholder => { return {x: stakeholder.ratings[stakeholder.ratings.length -1].interest,
      value: stakeholder.ratings[stakeholder.ratings.length -1].power,
      name: stakeholder.name,
      title: stakeholder.title,
      alias: stakeholder.alias}})
    })
    // set
  })
  // .then(this.setState({
  //   stakeholder: newStakeholdersState
  // }))
}

  // stakeholder.ratings[ratings.length -1].power = newRating
  // this.setState({
  //   stakeholders: newStakeholdersState
  // })
// }


componentDidMount() {
  const { id } = this.props.match.params
  APILogin.getProjectStakeholders(id)
  .then(stakeholders => this.setState({ stakeholders: stakeholders}))
  .then(chartData => this.setState({ chartData:
    this.state.stakeholders.map(stakeholder => { return {x: stakeholder.ratings[stakeholder.ratings.length -1].interest,
    value: stakeholder.ratings[stakeholder.ratings.length -1].power,
    name: stakeholder.name, title: stakeholder.title, alias: stakeholder.alias}})
    }))
}






  render() {



    let chart = anychart.quadrant();
    let yTitle = chart.yAxis().title();
    yTitle.enabled(true);
    yTitle.text("Power Rating --->");
    yTitle.align("bottom");

    let yScale = anychart.scales.linear();


    let yAxis = chart.yAxis(0);
    yAxis.scale(yScale);


    chart.xAxis().title("Interest Rating --->");

    chart.yScale().minimum(-0.5);
    chart.yScale().maximum(11.5);
    chart.xScale().minimum(-0.5);
    chart.xScale().maximum(11.5)

    chart.title("Power/Interest Position")
    chart.container("container")
    chart.draw();


    // const stakeholder_data = anychart.data.set(this.state.stakeholder.data)
    const dataSet = anychart.data.set(this.state.chartData);

    var markers = chart.marker(dataSet);


    // set labels settings
    markers.labels()
      .enabled(true)
      .fontFamily('Arial')
      .fontColor('#546e7a')
      .position('right')
      .anchor('left-center')
      .offsetX(2)
      .offsetY(2)
      .format('{%Name}')

    // enabled tooltip
    markers.tooltip(true);

    chart.quarters(quarters);


chart.tooltip().format(function() {
console.log(this);
return 'Interest: ' + this.x +
'\nPower: ' + this.value +
'\n ' + this.getData('name') +
'\n ' + this.getData('title') +
'\n ' + this.getData('alias')
});

    const { project_id } = this.props.match.params

return (
      <div className="char_page">
        <div className={"stakeholders_wrapper"}>
          {!this.state.selectedStakeholder && <SearchBar updateFilter={this.updateFilter}/>}
          {
            this.state.selectedStakeholder
            ?
            <Stakeholder project_id={project_id}
            />
            :
            <StakeholderContainer stakeholders={this.state.stakeholders}
                              selectedStakeholder={this.selectedStakeholder}
                              handleRating={this.handleRating}
                              filter={this.state.filter}
                              selectStakeholder={this.selectStakeholder}
                              project_id={project_id}/>
          }
        </div>

        <div className={"graph_section_wrapper"}>
          <div className="App" id='chart-position' >
            <AnyChart
              width='100%'
              height='100%'
              id='bar-chart'
              instance={chart}
              />
          </div>
          <NewStakeholderForm project_id={project_id} addNewStakeholder={this.addNewStakeholder}/>
        </div>
      </div>

    );
  }
}


export default PIChart;
