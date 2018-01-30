import React, { Component } from 'react';


class SelectBox extends Component{
  constructor() {
    super();
    
    this.state = {
      value: 'Select Option:'
    };
  }

  render(){
    return (
      <select id={this.props.name} className="form-control"
        value={this.state.value} onChange={this.onChange.bind(this)}>
        {this.props.options.map(option => {
          return <option value={option}>{option}</option>
        })}
      </select>
    );
  }
  
  onChange(event) {
    //  otherwise resets selectbox
    this.setState({value : event.target.value })
    
    this.props.onUpdate(event.target.value);
  }
}

export default SelectBox;