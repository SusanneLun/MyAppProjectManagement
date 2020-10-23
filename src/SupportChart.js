import React, { Component } from 'react'
import StakeholderSupport from './StakeholderSupport'
import APILogin from './APILogin'
import SupportContainer from './SupportContainer'
import Strategies from './Strategies'
import AnyChart from 'anychart-react'
import anychart from 'anychart'
import SearchBar from './SearchBar'
import './App.css'
import DropdownStakeholders from './DropdownStakeholders'



class SupportChart extends Component {
constructor() {
  super()
      this.state = {
        stakeholders: [],
        filter: '',
        chartData: null,
        option: "",
        selectedValue: 'Nothing selected'
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
   power: stakeholder.ratings[stakeholder.ratings.length - 1].power,
   interest: stakeholder.ratings[stakeholder.ratings.length - 1].interest,
   positivity: newRatings.positivity === "" ? stakeholder.ratings[stakeholder.ratings.length - 1].positivity : newRatings.positivity,
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
      value: stakeholder.ratings[stakeholder.ratings.length -1].power, size: stakeholder.ratings[stakeholder.ratings.length -1].positivity,
      name: stakeholder.name,
    }})
    })
    // set
  })
  // .then(this.setState({
  //   stakeholder: newStakeholdersState
  // }))
}

addNewStrategy = (stakeholder, strategy) => {
  let newStrategyState = [...this.state.stakeholder.strategy, strategy]
  this.setState({
  strategy: stakeholder.strategy,
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

handleSelectChange = (selectedValue) => {
  this.setState({
    selectedValue: selectedValue
  })
}

componentDidMount() {
  const { id } = this.props.match.params
  APILogin.getProjectStakeholders(id)
  .then(stakeholders => this.setState({ stakeholders: stakeholders}))
  .then(chartData => this.setState({ chartData:
      this.state.stakeholders.map(stakeholder => { return {x: stakeholder.ratings[stakeholder.ratings.length -1].interest,
        value: stakeholder.ratings[stakeholder.ratings.length -1].power,
        size: stakeholder.ratings[stakeholder.ratings.length -1].positivity,
        name: stakeholder.name
      }})
    }))
}



render() {
  let chart = anychart.scatter();
  const dataSet = anychart.data.set(this.state.chartData);
// let mapping = this.state.chartData.mapAs({x: 0, value: 1, size: 2, name: 3});
// let series = chart.bubble(mapping);

// / add a marker series
  chart.bubble(dataSet);


  chart.title("Project Support");

  // set axes titles
  chart.xAxis().title("Interest");
  chart.yAxis().title("Power");

  // draw
  chart.container("container");
  chart.draw();

  //         // turn on chart animation
  chart.animation(true);
//


//         // set chart margin settings
  chart.padding(20, 20, 10, 20);
//
//         // grid settings
//         chart.yGrid(true)
//                 .xGrid(true)
//                 .xMinorGrid(true)
//                 .yMinorGrid(true);
//
        // bubble size settings
  chart.minBubbleSize("3%")
        .maxBubbleSize("10%");
//
//         //set chart legend settings
  chart.legend()
        .enabled(true)
        .padding({bottom: 10});

  chart.yScale().minimum(0);
  chart.yScale().maximum(11);
  chart.xScale().minimum(0);
  chart.xScale().maximum(11)

  // chart.tooltip()
  //       .useHtml(true)
  //       .fontColor('#fff')
  //       .format(function () {
  //             return this.getData('data') + '<br/>' +
  //                           'Power: <span style="color: #d2d2d2; font-size: 12px">' +
  //                           this.getData('value') + '</span></strong><br/>' +
  //                           'Interest: <span style="color: #d2d2d2; font-size: 12px">' +
  //                           this.getData('x') + '</span></strong><br/>' +
  //                           'Positivity: <span style="color: #d2d2d2; font-size: 12px">' +
  //                           this.getData('size') + ' min.</span></strong>';
  //
  //               });



    chart.tooltip().format(function() {
    console.log(this);
    return 'Interest: ' + this.x +
    '\nPower: ' + this.value +
    '\nSupport: ' + this.size +
    '\n ' + this.getData('name');
    });

const { project_id } = this.props.match.params

  return (
    <div className={"char_page"}>
    <div className={"stakeholders_support_wrapper"}>
    {!this.state.selectedStakeholder && <SearchBar updateFilter={this.updateFilter}/>}
    {
      this.state.selectedStakeholder
      ?
      <StakeholderSupport
      project_id={this.props.match.params.id}/>
      :
      <SupportContainer stakeholders={this.state.stakeholders}
                        selectedStakeholder={this.selectedStakeholder}
                        handleRating={this.handleRating}
                        filter={this.state.filter}
                        selectStakeholder={this.selectStakeholder}
                        project_id={this.props.match.params.id}/>
    }
    </div>
    <div className={"graph_section_wrapper"}>
    <div className="App" id="chart-position">
      <AnyChart
      width='100%'
      height='100%'
      id='bar-chart'
      instance={chart}
      />
      </div>
      <h3>
      Choose a project stakeholder to manage strategies
      </h3>
      <DropdownStakeholders stakeholders={this.state.stakeholders}
      onSelectChange={this.handleSelectChange}/>
      <div>
      Selected value: {this.state.selectedValue}
      </div>
      <Strategies />
      </div>
    </div>
  )
}

}

export default SupportChart
