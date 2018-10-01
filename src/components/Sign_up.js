import React, { Component } from 'react';
import Footer from './Footer.js'
import '../styles/Log_in-Sign_up.css';

import {testPassword} from '../scripts/testPassword.js';

class Sign_up extends Component {
  
  constructor(props){
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          securityPassword: 'low',
        };
        
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
  handleSubmit(e){
    this.setState({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
  }
  
  handlePassword(e){
    let {name, value} = e.target
    
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
                  <input type="text" placeholder="First and second name" className="form-control" form-control id="name" name="name" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email (*):</label>
                  <input type="email" placeholder="example@unal.edu.co" className="form-control" id="email" name="email" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password (*):</label>
                  <input type="password" placeholder="password" className="form-control" id="password" name="password" onChange={this.handlePassword} required/>
                  <small className="form-text text-muted">{this.state.securityPassword}</small>
                </div>
              </div>
              <div className="pt-4">
                <input type="submit" value="Sign me up!" className="btn btn-success btn-block active"/>
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