import './App.sass';

import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import React, { Component } from 'react';

import Loginscreen from './Loginscreen';
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Cookies from 'universal-cookie';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class App extends Component {

  login = () => {
    this.setState({ isAuth: true });
  }

  logout = () => {
    this.setState({ 
    	isAuth: false 
    });
	this.props.history.push("/");
  }

  constructor(props){
    super(props);
    this.state={
	  SERVER_HOST: "localhost:8080/",
	  isAuth: false
    }
  }
  componentDidMount(){
  	var isAuth = false;
    const cookies = new Cookies();
    var session = cookies.get('session',{path:'/'})
    var email = cookies.get('session',{path:'/'})

    if (session){
    	this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="App">
		<NavBar isAuth={this.state.isAuth} logout={this.logout}/>
		<ReactNotification />
		<Route exact path="/"><Loginscreen /></Route>
		<Route path="/login"><Login login={this.login}/></Route>
		<Route path="/register"><Register /></Route>
		<Route path="/dashboard"><Dashboard /></Route>
      </div>
    );
  }
}

export default withRouter(App);