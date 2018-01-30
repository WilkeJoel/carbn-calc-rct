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
            vehicles: [],  // Question blocks
            vehicleNums: 0,
            vehicleMaint: '',
            vehicleEmmitters: []
        }
    }
    
    render(){
        const theVehicles = this._getVehicles();
        
        return(
            <div className="col-sm-6  emitter">
                {this._getHowManyQuestion()}
                {theVehicles}
            </div>
        );
    }
    
    _getHowManyQuestion(){
        //const qtyQues = [{id: 1, name: 'vehicleNum', question: 'How many vehicles does your household have?', icon: '', input: 'number', options: 'none', output: 'none'}];
        
        return <Question
                id={1}
                name={'vehicleNum'}
                question={'How many vehicles does your household have?'}
                input={'number'}
                options={'none'}
                onUpdate={this._addVehicles.bind(this)}
                output={'none'}/>
    }
  
    _addVehicles(name, inputVal){
        if (this.state.vehicleNums < inputVal){
            const vehicle = {
                id: this.state.vehicles.length + 1
            };
            
            this.setState({
                vehicles: this.state.vehicles.concat([vehicle])
            });

        } else {
            while (this.state.vehicles.length > inputVal){
                this.state.vehicles.slice(0, this.state.vehicles.length-1);
            }
        }
    }
  
    _getVehicles() {
        return this.state.vehicles.map((vehicle) => {
            return <Vehicle
                id={vehicle.id} />
        });
    }
  
    _getQuestions(){
        return this.state.questions.map((question) => {
            return <Question
                id={question.id}
                name={question.name}
                question={question.question}
                input={question.input}
                options={question.options}
                onUpdate={this._setVehicleEmissions.bind(this)}
                output={question.output}/>
        });
    }

    _updateQuestion(name){  //  inputValue, selectOption

        // find question in array with name =
        function getProperty(obj){
            return obj.name === name;
        }
    
        var myObj = this.state.questions.find(getProperty);
        //myObj.output = this.state.homeEmitters[name];
        
        const questions = this.state.questions;
        
        this.setState({questions});
    }
    
    _setVehicleEmissions(name, inputVal, selectOpt){
        alert("SetVehicles: " + name + ' :: ' + inputVal + ' :: ' + selectOpt);
        
        if (name === 'vehicleNum'){
            this.setState({
                vehicleNums: inputVal
            })
        } else if (name === 'vehicleMaint'){
            this.setState({
                vehicleMaint: selectOpt
            })
        }
    }
    
    _setTotalVehicleEmissions(name, val){
        let theTotal = this.state.vehicleEmmitters.reduce(function(accum, val){
            return accum + val;
        },0);
        
        this.props.setTotalEmissions('trans', theTotal);
    }
}

class Vehicle extends React.Component {
    constructor() {
    super();
    
    this.state = {
        vehicleMiles: 0,
        vehicleMilesSelect: '',
        vehicleMPG: 0,
        vehicleEmissions: 0
    };
  }
  
    render(){
        //const theQuestions = this._getQuestions();
        
        return(
            <div className="col-sm-6  emitter">
                {this._getMilesQuestion()}
                {this._getMPGQuestion()}
                {this.state.vehicleEmissions} lbs of CO2
            </div>
        );
    }
    
    _getMilesQuestion() {
        return <Question
            id={this.props.id + 0}
            name={'vehicleMiles' + this.props.id}
            question={'On average, miles you drive:'}
            input={'number'}
            options={['Per Year', 'Per Week']}
            onUpdate={this._setVehicleEmission.bind(this)}
            output={'none'}/>
    }
    
    _getMPGQuestion() {
        return <Question
            id={this.props.id + 1}
            name={'vehicleMPG' + this.props.id}
            question={'Average gas mileage:'}
            input={'number'}
            options={'none'}
            onUpdate={this._setVehicleEmission.bind(this)}
            output={'none'}/>
    }
    
    _setVehicleEmission(name, inputVal, selectOpt){
        if (this.state.vehicleMiles !== 0 && this.state.vehicleMilesSelect !== '' && this.state.vehicleMPG !== 0){
            let theTotal = calcVehicleEmissions(this.state.vehicleMiles, this.state.vehicleMilesSelect, this.state.vehicleMPG);
            this.props.setTotalVehicleEmissions(this.props.id, theTotal)
        }
    }
    
    _handleInputValues(name, inputVal, selectOpt){
        if (name === 'vehicleMiles'){
            this.setState({
                vehicleMiles: inputVal,
                vehicleMilesSelect: selectOpt
            });
        }
        else if (name === 'vehicleMPG'){
            this.setState({
                vehicleMPG: inputVal
            });
        }
    }


    
}
/*
class HomeEmissions extends React.Component {
  constructor() {
    super();
    
    this.state = {
      questions: [],
      primaryHeat: '',
      homeEmitters: {
        natGas: 0,
        elec: 0,
        fuelOil: 0,
        propane: 0,
       }
    };
  }
    
  componentWillMount() {
    this._setQuestions();
  }
  
  render(){
    const theQuestions = this._getQuestions();
    
    return(
      <div className="col-sm-6 emitter">
        {theQuestions}
      </div>
    );
  }
  
  _getQuestions(){
    return this.state.questions.map((question) => {
      return <Question
                id={question.id}
                name={question.name}
                question={question.question}
                input={question.input}
                options={question.options}
                onUpdate={this._setHomeEmissions.bind(this)}
                output={question.output}/>
    });
  }
    
  _setQuestions(){
    const tempQues = [
      {id: 1, name: 'primaryHeat', question: 'What is your household\'s primary heating source?', icon: '', input: 'none', options: ['Select Option:', 'Natural Gas', 'Fuel Oil', 'Electricity', 'Proprane'], output: 'q1'},
      {id: 2, name: 'natGas', question: 'Enter your average Natural Gas monthly bill or usage:', icon: '', input: 'number', options: ['Dollars', 'Thousand Cubic Feet', 'Therms'], output: 'q2'},
      {id: 3, name: 'elec', question: 'Enter your average Electricity monthly bill or usage:', icon: '', input: 'number',options: ['Dollars', 'kWh'], output: 'q3'},
      {id: 4, name: 'fuelOil', question: 'Enter your average Fuel Oil monthly bill or usage:', icon: '', input: 'number',options: ['Dollars', 'Gallons'], output: 'q4'},
      {id: 5, name: 'propane', question: 'Enter your average Propane monthly bill or usage:', icon: '', input: 'number',options: ['Dollars', 'Gallons'], output: 'q5'}];
    
    this.setState({ questions: tempQues });
  }
  
  _updateQuestion(name){  //  inputValue, selectOption

    // find question in array with name =
    function getProperty(obj){
      return obj.name === name;
    }
    
    var myObj = this.state.questions.find(getProperty);
    myObj.output = this.state.homeEmitters[name];
    
    const questions = this.state.questions;
    
    this.setState({questions});
  }
  
    _setHomeEmissions(name, inputVal, selectOpt){  //  name, inputNum, selectOpt
        
        alert("name: " + name);
        
        if (name === 'primaryHeat'){
            this.setState({
                primaryHeat: selectOpt
            });
        } else if (this.state.primaryHeat != ''){
            let homeEmitters = Object.assign({}, this.state.homeEmitters);
            
            if (name === 'natGas' ){
                homeEmitters.natGas = calcNaturalGas(inputVal, selectOpt);
            }
            else if (name === 'elec'){
                homeEmitters.elec = calcElectric(inputVal, selectOpt);
            }
            else if (name ==='fuelOil' ){
                homeEmitters.fuelOil = calcFuelOil(inputVal, selectOpt);
            }
            else if (name ==='propane' ){
                homeEmitters.propane = calcPropane(inputVal, selectOpt);
            }
        
            this.setState({homeEmitters}, function(){
                this._updateQuestion(name);
                this._setTotalHomeEmmitters();
            });
        } else {
            alert("Select Primary Heat Source First");
        }
    }
    
    _setTotalHomeEmmitters(){        
        let theTotal =  Object.values(this.state.homeEmitters)
                .reduce(function(accum, val){
                  return accum + val;
                },0);
        
        this.props.setTotalEmissions('home', theTotal);
    }
}
*/
export default Calculator;







