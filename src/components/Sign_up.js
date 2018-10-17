import React, { Component } from 'react';
import axios from 'axios';

import Footer from './Footer.js';
import {testPassword} from '../scripts/testPassword.js';
import api_route from '../route';

import '../styles/Log_in-Sign_up.css';

class Sign_up extends Component {
  
  constructor(props){
        super(props);
        this.state = {
          securityPassword: 'None'
        };
        
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
  handleSubmit(e){
    
    e.preventDefault()
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    axios.get(api_route + 'users')
    .then( (response) => {
      let index=false;
      const resUsers = response.data.data;
      for(let i=0; i<resUsers.length; i++)
        if(resUsers[i].attributes.name === email){
          index = true;
          break;
        }
        
        if(index)
          alert("El usuario ya existe.")
        else{
          axios.post(api_route + 'users', {
            name: email, 
            password, 
            level: 708, 
            reputation: "Bronze III",
            role: "student", 
            number_of_followers: 298, 
            photo: "null"
          });
          window.location.href = "/home";
        }
      
    });
  }
  
  handlePassword(e){
    let value = e.target.value;
    
    console.log(value)
    
      this.setState({
        securityPassword: testPassword(value)
      })
  }
  
  render() {
    return (
      <div className="container">
      <h1 className="title-initial-forms deepshadow">Proyecto ungrupo</h1>
        <div className="container-form-pad">
          <div className="container-form p-4">
            <h1 className="display-3 title-l">Sign up</h1>
            <form name="sign-up-form" onSubmit={this.handleSubmit}>
              <div className="form-left">
                <div className="form-group pt-2">
                  <label htmlFor="name">Name (*):</label>
                  <input type="text" placeholder="First and second name" className="form-control" id="name" name="name" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email (*):</label>
                  {/*<input type="email" placeholder="example@unal.edu.co" className="form-control" id="email" name="email" required/>*/}
                  <input type="text" placeholder="example@unal.edu.co" className="form-control" id="email" name="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password (*):</label>
                  <input type="password" placeholder="password" className="form-control" id="password" name="password" onChange={this.handlePassword} required/>
                  <small className="form-text text-muted">{this.state.securityPassword}</small>
                </div>
              </div>
              <div className="pt-4">
                <input type="submit" className="btn btn-success btn-block active" value="Sign me up!" />
              </div>
              <div className="pt-4">
                <a href="/log_in">Want to log in?</a>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Sign_up;