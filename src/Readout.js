import React, { Component } from 'react';


class Readout extends React.Component{
  render(){
    return(
      <div className="readout">
        <h3>Your Carbon Footprint</h3>
        <h4>Annual CO2 emissions (lbs.)</h4>
        <p>Your Current Total: {this.props.currentTotal}</p>
        <p>New Total After Your Planned Actions: {this.props.plannedTotal}</p>
        <p>U.S. Average*: {this.props.usTotal}</p>
      </div>
    )
  }
}

export default Readout;