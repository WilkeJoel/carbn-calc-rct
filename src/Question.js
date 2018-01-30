import React, { Component } from 'react';
import SelectBox from './SelectBox.js';
import InputNumberBox from './InputNumberBox.js';


class Question extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            inputValue: 0,
            selectOption: ''
        };
        this._handleInputNumber.bind(this);
    }
  
    render(){
        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="primaryHeat" className="col-sm-3 control-label">{this.props.question}</label>
                    <div className="col-sm-3">
                        {this._getInputNumberBox(this.props.id, this.props.input)}
                        {this._getSelectBox(this.props.id, this.props.options)}
                    </div>
                    <div className="col-sm-3">
                        <p className="output">{this.props.output}</p>
                    </div>
                </div>
            </div>
        );
    }
   
    _getSelectBox(id, options){
        if (this.props.options != 'none'){
            return <SelectBox
                id={id}
                onUpdate={this._handleSelect.bind(this)}
                options={options} />
        }
    }
  
    _getInputNumberBox(id, inputValue){
        if (this.props.input === 'number'){
            return <InputNumberBox
                id={id}
                value={this.state.inputValue}
                onUpdate={this._handleInputNumber.bind(this)} />
        } else {
            return;
        }
    }
  
    _handleInputNumber(val){    
        this.setState({
            inputValue: val
        }, function(){
            this._setUpdate();
        });
    }
  
    _handleSelect(val) {
        this.setState({
            selectOption: val
        }, function(){
            this._setUpdate();
        });
    }
  
    _setUpdate(){
        //  determine if user input requirements are fulfilled.
        
        if (this.props.input != 'number'){
            //  If a Selectbox, needs only the selectOption, sends a placeholder for the receiving function
            this.props.onUpdate(this.props.name, this.state.inputValue, this.state.selectOption);
        } else if (this.props.options === 'none'){
            // number input only question
            this.props.onUpdate(this.props.name, this.state.inputValue, this.state.selectOption);
        }else {
            //  _updateQuestion in <HomeEmissions>
            if (this.state.inputValue != 0 && this.state.selectOption != ''){
                this.props.onUpdate(this.props.name, this.state.inputValue, this.state.selectOption);
            }
        }
    }
}


export default Question;