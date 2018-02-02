import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Readout from './Readout.js';
import HomeEmissions from './HomeEmissions.js';
import VehicleEmissions from './VehicleEmissions.js';


class Calculator extends Component {
    constructor() {
    super();

    this.state = {
      totalEmissions: 0,
      revisedTotalEmissions: 0,
      usAvgEmissions:0,
      theEmmitters: {
        homeEmissions: 0,
        transEmissions: 0,
        wasteEmissions: 0
      }
    };
  }
    
    render(){
        const theReadout = this._getReadout();
        
        return(
            <div className="row">
                <HomeEmissions setTotalEmissions={this._setTotalEmissions.bind(this)}/>
                <VehicleEmissions setTotalEmissions={this._setTotalEmissions.bind(this)}/>
                
                <div className="col-sm-6">
                    {theReadout}
                </div>
            </div>
        );
    }

    _getReadout(){
        return <Readout
            currentTotal={this.state.totalEmissions}
            plannedTotal={this.state.revisedTotalEmissions}
            usTotal={this.state.usAvgEmissions} />;
    }
  
    _setTotalEmissions(which, inputVal){  //  name, inputNum, selectOpt
        let theEmmitters = Object.assign({}, this.state.theEmmitters);
    
        if (which === 'home' ){
            theEmmitters.homeEmissions = inputVal;
        }
        else if (which === 'trans'){
            theEmmitters.transEmissions = inputVal;
        }
        else if (which === 'waste'){
            theEmmitters.wasteEmissions = inputVal;
        }
        
        this.setState( {theEmmitters}, function(){
            this._getTotalEmissions();
        });
    }
  
    _getTotalEmissions(){
        this.setState({
            totalEmissions: Object.values(this.state.theEmmitters)
                .reduce(function(accum, val){
                    return accum + val;
                },0)
        });
    }
}



export default Calculator;







