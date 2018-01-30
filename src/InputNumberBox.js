import React, { Component } from 'react';

class InputNumberBox extends Component {
  render(){
    return (
      <input
        pattern='[0-9]*'
        min={0}
        type='number'
        className='form-control'
        id={this.props.name}
        onChange={this.onChange.bind(this)}
        value={this.props.value} />
      );  
  }
  onChange(event) {
    //  Hack for <input type='number'
    this.props.onUpdate( parseInt(event.target.value) );
  }
}

export default InputNumberBox;