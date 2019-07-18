import React, { Component } from 'react';
import './App.css';
import AnyChart from 'anychart-react'
import anychart from 'anychart'
import APILogin from './APILogin'
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

class AliasChart extends Component {
constructor() {
  super()
    this.state = {
      stakeholders: [],
      chartData: null
    }
}


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
    .format('{%Alias}')

  // enabled tooltip
  markers.tooltip(true);

  chart.quarters(quarters);

const { project_id } = this.props.match.params

return (
  <div className={"graph_section_wrapper"}>
    <div className="App" id='chart-position' >
      <AnyChart
        width='100%'
        height='100%'
        id='bar-chart'
        instance={chart}
        />
    </div>
    </div>
)
}
}

export default AliasChart
