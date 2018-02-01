import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import trial from './utils';
import calcNaturalGas from './functions/calcNaturalGas.js';
import calcFuelOil from './functions/calcFuelOil.js';
import calcElectric from './functions/calcElectric.js';
import calcPropane from './functions/calcPropane.js';
import calcVehicleEmissions from './functions/calcVehicleEmissions.js';

import Readout from './Readout.js';
import Question from './Question.js';
import HomeEmissions from './HomeEmissions.js';


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

class VehicleEmissions extends React.Component {
    constructor() {
        super();
        this.state = {
            vehicleNum: 0,
            vehicles: [],  // Question blocks
            vehicleMaint: 'Choose One',
            vehicleEmmitters: []  //  the values
        }
    }
    
    render(){
        const theVehicles = this._getVehicles();
        
        return(
            <div className="col-sm-6  emitter">
                {this._getHowManyQuestion()}
                {this._getMaintainQuestion()}
                {theVehicles}
            </div>
        );
    }
    
    _updateVehicleNum(){
        if (this.state.vehicles.length < this.state.vehicleNum){
            this._addVehicle();
        }
        else if (this.state.vehicles.length > this.state.vehicleNum){
            this._deleteVehicle();
        }
    }
    
    _deleteVehicle(){
        const vehicles = this.state.vehicles.slice(0, this.state.vehicleNum);
        const vehicleEmmitters = this.state.vehicleEmmitters.slice(0, this.state.vehicleNum);
        
        this.setState({
            vehicles,
            vehicleEmmitters
            }, function(){
            this._updateVehicleNum();
        });
    }
    
    _addVehicle(){
        const vehicle = {
            id: this.state.vehicles.length
        };
        
        this.setState({
            vehicles: this.state.vehicles.concat([vehicle])
        }, function(){
            this._updateVehicleNum();
        });
    }

    _getVehicles(){
        if (this.state.vehicleMaint !== 'Choose One'){
            return this.state.vehicles.map((vehicle) => {
                return <Vehicle
                    id={vehicle.id}
                    onUpdate={this._setVehicleEmissions.bind(this)} />
            });
        }
    }
    
    _setVehicleEmissions(id, inputVal){        
        const vehicleEmmitters = this.state.vehicleEmmitters.slice();
        vehicleEmmitters[id] = inputVal;
        
        this.setState({ vehicleEmmitters }, function(){
            //this._setUpdate();
        });
    }
    
    _setVehicleNum(name, inputVal){
        //  From GetHowMany Question
        this.setState({ vehicleNum: inputVal },
            function(){
                this._updateVehicleNum();
            });
    }
    
    _getHowManyQuestion(){        
        return <Question
                id={0}
                name={'vehicleNum'}
                question={'How many vehicles does your household have?'}
                input={'number'}
                options={'none'}
                onUpdate={this._setVehicleNum.bind(this)}
                output={'none'}/>
    }
    
    _getMaintainQuestion(){
        //  question: 'Perform regular maintenance on your vehicle(s)', icon: '', input: 'none', options: ['Do Not Do', 'Already Done'], output: 'none'},
        if (this.state.vehicles.length > 0){
            return <Question
                id={1}
                name={'vehicleMaint'}
                question={'Perform regular maintenance on your vehicle(s)'}
                input={'none'}
                options={['Choose One', 'Do Not Do', 'Already Done']}
                onUpdate={this._setMaintenance.bind(this)}
                output={'none'}/>
        }
    }
    
    _setMaintenance(name, inputVal, selectOpt){
        const vehicleMaint = selectOpt;
        
        this.setState({ vehicleMaint }, function(){
            this._getVehicles();
        });
    }
}

class Vehicle extends React.Component {
    constructor() {
    super();
    
    this.state = {
        vehicleMiles: 0,
        vehicleMilesSelect: '',
        vehicleMPG: 0,
        vehicleEmission: 0
    };
  }
  
    render(){
        return(
            <div className="col-sm-6  emitter">
                {this._getMilesQuestion()}
                {this._getMPGQuestion()}
                {this.state.vehicleEmission} lbs of CO2
            </div>
        );
    }
    
    _getMilesQuestion() {
        return <Question
            id={this.props.id}
            name={'vehicleMiles' + this.props.id}
            question={'On average, miles you drive:'}
            input={'number'}
            options={['Per Year', 'Per Week']}
            onUpdate={this._handleInputValues.bind(this)}
            output={'none'}/>
    }
    
    _getMPGQuestion() {
        return <Question
            id={this.props.id + 1}
            name={'vehicleMPG' + this.props.id}
            question={'Average gas mileage:'}
            input={'number'}
            options={'none'}
            onUpdate={this._handleInputValues.bind(this)}
            output={'none'}/>
    }
    
    _setVehicleEmission(){
        if (this.state.vehicleMiles !== 0 && this.state.vehicleMilesSelect !== '' && this.state.vehicleMPG !== 0){
            let vehicleEmission = 0;
            vehicleEmission = calcVehicleEmissions(this.state.vehicleMiles, this.state.vehicleMilesSelect, this.state.vehicleMPG);
            
            this.setState({ vehicleEmission }, function(){
                this._setUpdate();
            });
        }
    }
    
    _setUpdate(){
        this.props.onUpdate(this.props.id, this.state.vehicleEmission);
    }
    
    _handleInputValues(id, inputVal, selectOpt){
        const name = id.slice(0, -1);
        
        if (name === 'vehicleMiles'){
            this.setState({
                vehicleMiles: inputVal,
                vehicleMilesSelect: selectOpt
            }, function(){
                this._setVehicleEmission();
            });
        }
        else if (name === 'vehicleMPG'){
            this.setState({
                vehicleMPG: inputVal
            }, function(){
                this._setVehicleEmission();
            });
        }
    }
    
}

export default Calculator;







