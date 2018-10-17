import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer.js';
import api_route from '../route';

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
    
    axios.get(api_route + 'users')
    .then(response => {
        let users = response.data.data;
        for(let i=0; i<users.length; i++){
          if(users[i].attributes.usern === email){
            if(users[i].attributes.password === password){
              window.location.href = "/home"; 
            }else{
              alert("The user doesnt exist or the password doesnt match")
            }
            break;
          }
        }
    })
    .catch(error => {
      alert(error.message);
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
                <div className="form-group">
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