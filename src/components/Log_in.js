import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer.js';
//import Home from './Home.js';

//import {BrowserRouter, Route, Redirect, Link} from 'react-router-dom'

import '../styles/Log_in-Sign_up.css';


class Log_in extends Component {
  
  constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            token: null
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
  handleSubmit(e){
    
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    axios.get('https://back-end-project-caenietoba.c9users.io/users')
    .then((response) => {
      var user = null;
      for(let i=0; i<response.data.length; i++)
        if( response.data[i].name === email ){
          user = response.data[i];
          break;
        }
      
      console.log(user)
      
      if(user === null || user.password !== password){
        alert("The user doesnt exist or the password doesnt match")
      }else{
        window.location.href = "/home"; 
      }
    });
  }
  
  render() {
    
    return (
      <div className="container">
        <h1 className="title-initial-forms deepshadow">Proyecto ungrupo</h1>
        <div className="container-form-pad">
          <div className="container-form p-4">
            <h1 className="display-3 title-l">Log in</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-left">
                <div className="form-group pt-2">
                  <label htmlFor="email">Email (*):</label>
                  {/*<input type="email" placeholder="example@unal.edu.co" className="form-control" id="email" required/>*/}
                  <input type="text" placeholder="example@unal.edu.co" className="form-control" id="email" name="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password (*):</label>
                  <input type="password" name="password" placeholder="password" className="form-control" id="password" required/>
                </div>
              </div>
              <div className="pt-4">
                <input type="submit" className="btn btn-success btn-block active" value="Log me in!" />
              </div>
              <div className="row pt-4">
                <div className="col">
                  <a href="#">Did you forget password?</a>
                </div>
                <div className="col">
                  <a href="/sign_up">Want to sign up?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Log_in;