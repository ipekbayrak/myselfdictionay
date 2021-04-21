import React, { Component } from 'react';

class Notification extends Component {
  handleClick(event){
	event.preventDefault();
  }
  
  click = () => {
    this.props.removeNotification();
  }
  constructor(props){
    super(props);
    this.state={
    }
  }
  componentWillMount(){

  }
  render() {
    return (
	<div className="notification is-danger">
	  <button className="delete" onClick={this.click} ></button>
	  you have some errors. Please chack forum fields.
	</div>
    );
  }
}

export default Notification;