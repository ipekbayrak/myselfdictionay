import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Login from './Login';
import Register from './Register';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  componentWillMount(){

  }
  render() {
    return (
      <div className="loginscreen">
		<h1 className="title">My Self Dictionary</h1>
		<p className="subtitle">
			A user defined dictionary app codded by love for sanlyy
		</p>
      </div>
    );
  }
}

export default Loginscreen;