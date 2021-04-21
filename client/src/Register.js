import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Login from './Login';

import { store } from 'react-notifications-component';

import { withRouter } from "react-router-dom";

class Register extends Component {
	
	onError = (error) => {
		console.log(error);
		store.addNotification({
		  title: "Error!",
		  message: "Please check input fileds for any potentional mistakes",
		  type: "danger",
		  insert: "top",
		  container: "top-right",
		  animationIn: ["animate__animated", "animate__fadeIn"],
		  animationOut: ["animate__animated", "animate__fadeOut"],
		  dismiss: {
			duration: 5000,
			onScreen: true
		  }
		});
   }
	
 
  firstnameChange = (e)  => {
      var value = e.target.value;
      this.setState({firstname: value});
  }
  lastnameChange = (e)  => {
      var value = e.target.value;
      this.setState({lastname: value});
  }
  emailChange = (e)  => {
      var value = e.target.value;
      this.setState({email: value});
  }
  passChange = (e)  => {
      var value = e.target.value;
      this.setState({password: value});
  }
  pass2Change = (e)  => {
      var value = e.target.value;
      this.setState({password2: value});
  }

  handleClick = (event)  => {
	event.preventDefault();

    console.log("values",this.state.firstname,this.state.lastname,this.state.email,this.state.password);
    var self = this;
    var payload={
      "firstname": this.state.firstname,
      "lastname":this.state.lastname,
      "email":this.state.email,
      "password":this.state.password,
      "password2":this.state.password2
    }

    var options = {
      method: 'post',
      url: 'http://localhost:8080/api/register',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data, headers) => {
        return data;
      }]
    };

    axios(options)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
        store.addNotification({
          title: "Success!",
          message: "Please login :) Enjoy..",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
          duration: 5000,
          onScreen: true
          }
        });
       }

       self.props.history.push("/login");


     })
   .catch(this.onError);
  }



  removeNotification = () => {
    this.setState({
      showNotification: false
    })
  }
  
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
	    password2:'',
    }
	
	 
  }
  render() {
    return (
	<div>
	
	
	
<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Frist Name</label>
              <div class="control has-icons-left">
                <input type="text" placeholder="Alice" class="input" onChange={this.firstnameChange} required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Last Name</label>
              <div class="control has-icons-left">
                <input type="text" placeholder="Wonderlands" class="input" onChange={this.lastnameChange} required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="bobsmith@gmail.com" class="input" onChange={this.emailChange} required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" onChange={this.passChange} required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Repeat Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" onChange={this.pass2Change} required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" onClick={(event) => this.handleClick(event)}>
                Register
              </button>
           <br/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
    );
  }
}

export default withRouter(Register);