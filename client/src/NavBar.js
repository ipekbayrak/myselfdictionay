import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
class NavBar extends Component {
  constructor(props){
    super(props);
    

    this.state={
    	isAuth: this.props.isAuth
    }

  }

  logout = () => {
	this.setState({
		isAuth: true
	});
	this.props.logout();

	const cookies = new Cookies();
    cookies.remove('session')
    cookies.remove('email')
  }

  componentDidMount(){
  	var isAuth = false;
    const cookies = new Cookies();
    var session = cookies.get('session',{path:'/'})
    var email = cookies.get('session',{path:'/'})

    if (session){
	    this.setState({
	    	isAuth: true
	    })
    } else {
    	this.props.history.push("/");
    }
  }
  render() {
    return (
		<nav class="navbar" role="navigation" aria-label="main navigation">
		  <div class="navbar-brand">
			<Link class="navbar-item" to="/">
			  <img src="/logo.png" width="112" height="28"/>
			</Link>

			<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			  <span aria-hidden="true"></span>
			  <span aria-hidden="true"></span>
			  <span aria-hidden="true"></span>
			</a>
		  </div>

		  <div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
			  <Link to="/" class="navbar-item">
				Home
			  </Link>
			</div>
			<div class="navbar-end">

			  {this.state.isAuth ? null : (<div class="navbar-item">
				<div class="buttons">
				  <Link to="/register" class="button is-primary">
					<strong>Sign up</strong>
				  </Link>
				  <Link to="/login" class="button is-light">
					Log in
				  </Link>
				</div>
			  </div>)}

			  {!this.state.isAuth ? null : (<div class="navbar-item">
				<div class="buttons">
				  <a class="button is-primary" onClick={this.logout}>
					<strong>Logout</strong>
				  </a>
				</div>
			  </div>)}

			</div>
		  </div>
		</nav>
    );
  }
}

export default withRouter(NavBar);