import React, { Component } from 'react';
import calcNaturalGas from './functions/calcNaturalGas.js';
import calcFuelOil from './functions/calcFuelOil.js';
import calcElectric from './functions/calcElectric.js';
import calcPropane from './functions/calcPropane.js';


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
      <div className="col-sm-6">
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