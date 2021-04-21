import React, { Component } from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Cookies from 'universal-cookie';


import { withRouter } from "react-router-dom";

class Login extends Component {
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
  
  emailChange = (e)  => {
      var value = e.target.value;
      this.setState({email: value});
  }
  passChange = (e)  => {
      var value = e.target.value;
      this.setState({password: value});
  }

  handleClick = (event)  => {
  event.preventDefault();

    var self = this;
    var payload={
      "email":this.state.email,
      "password":this.state.password
    }

    var options = {
      method: 'post',
      url: 'http://localhost:8080/api/login',
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
       if(response.data.isAuth === true){
        store.addNotification({
          title: "Success!",
          message: "Welcome",
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

        const cookies = new Cookies();
        cookies.set('session', response.data.id, { path: '/' });
        cookies.set('email', response.data.email, { path: '/' });

        self.props.login();
        self.props.history.push("/dashboard");

       } else {
        store.addNotification({
          title: "Warning",
          message: "wrong mail or password",
          type: "warning",
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

     })
   .catch(this.onError);
  }

  constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
  }
render() {
    return (
<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="" class="input" onChange={this.emailChange}  required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="" class="input" onChange={this.passChange}  required/>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-primary" onClick={(event) => this.handleClick(event)}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  }
}

export default withRouter(Login);