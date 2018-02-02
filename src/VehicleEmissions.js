import React, { Component } from 'react';
import Vehicle from './Vehicle.js';
import Question from './Question.js';


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
            //maintenance: this.state.vehicleMaint
        };
        
        this.setState({
            vehicles: this.state.vehicles.concat([vehicle])
        }, function(){
            this._updateVehicleNum();
        });
    }

    _getVehicles(){
        if (this.state.vehicleMaint !== 'Choose One'){
              //alert("HERE: " + JSON.stringify(this.state.vehicles));
            return this.state.vehicles.map((vehicle) => {
                return <Vehicle
                    id={vehicle.id}
                    maintenance ={this.state.vehicleMaint}
                    onUpdate={this._setVehicleEmissions.bind(this)} />
            });
        }
    }
    
    _setVehicleEmissions(id, inputVal){        
        const vehicleEmmitters = this.state.vehicleEmmitters.slice();
        vehicleEmmitters[id] = inputVal;
        
        this.setState({ vehicleEmmitters }, function(){
            this._setUpdate();
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
        
        let vehicles = [...this.state.vehicles];

      vehicles = this.state.vehicles.map((vehicle) => {
            vehicle.maintenance = selectOpt;
            return vehicle;
        });
      
        this.setState({
            vehicleMaint,
            vehicles
            }, function(){
            this._getVehicles();
        });
    }
    
    _setUpdate(){
        let theTotal = this.state.vehicleEmmitters.reduce(function(accum, val){
            return accum + val;
        },0);
        
        this.props.setTotalEmissions('trans', theTotal);
    }
}

export default VehicleEmissions;