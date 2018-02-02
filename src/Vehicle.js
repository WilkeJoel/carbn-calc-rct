import React, { Component } from 'react';
import calcVehicleEmissions from './functions/calcVehicleEmissions.js';
import Question from './Question.js';


class Vehicle extends React.Component {
    constructor(props) {
    super(props);
    
    this.state = {
        maintenance: this.props.maintenance,
        vehicleMiles: 0,
        vehicleMilesSelect: '',
        vehicleMPG: 0,
        vehicleEmission: 0
    };
  }
  
    componentWillReceiveProps(nextProps) {
        if(this.props.maintenance !== nextProps.maintenance){
            //this._alertMethod(nextProps);
            this.setState({
                maintenance: nextProps.maintenance
            }, function(){
                this._setVehicleEmission();
            });
        }
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
            vehicleEmission = calcVehicleEmissions(this.state.vehicleMiles, this.state.vehicleMilesSelect, this.state.vehicleMPG, this.props.maintenance);
            
            this.setState({ vehicleEmission }, function(){
                this._setUpdate();
            });
        }
    }
    
    _setUpdate(){
        this.props.onUpdate(this.props.id, this.state.vehicleEmission);
    }
    
    _alertMethod(input){
        alert('Alert Method: ' + JSON.stringify(input));
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


export default Vehicle;