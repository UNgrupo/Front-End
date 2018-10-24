import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer.js';
import {testPassword} from '../scripts/testPassword.js';
import userActions from '../_actions/actions-user.js';

import '../styles/Log_in-Sign_up.css';

class Sign_up extends Component {
  
  constructor(props){
        super(props);
        
        this.props.dispatch(userActions.logout());
        
        this.state = {
          securityPassword: 'None',
          password: '',
          confirmPassword: '',
          name: '',
          username: '',
          email: '', 
          submitted: false, 
          matchPasswords: true
        };
        
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
  async componentDidMount(){
    await this.props.dispatch(userActions.getAll());
  }
    
  async handleSubmit(e){
    
    e.preventDefault();
    
    const username = e.target.elements.username.value;
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    
    if( confirmPassword !== password ){
      this.setState({
        submitted: true,
        matchPasswords: false
      });
      return;
    } 
  
    const user = {
      name,
      email,
      usern: username,
      password,
      level: 1,
      reputation: 'Bronze V',
      role: 'strudent',
      'number-of-followers': 0,
      photo: null
    };
    
    const {dispatch, users} = this.props;
    
    if( username && email && name && password && confirmPassword )
      await dispatch( userActions.signUp( user, users ) );
    
    this.setState({
      submitted: true
    });
  }
  
  handleChange(e){
    
    const {name, value} = e.target;
    
    this.setState({
      [name]: value
    });
  }
  
  handlePassword(e){
    const password = e.target.value;
    
    this.setState({
      securityPassword: testPassword(password),
      password
    });
  }
  
  handleConfirmPassword(e){
    const password = e.target.value;
    
    this.setState( {
      confirmPassword: password,
      matchPasswords: true
    } );
  }
  
  render() {
    
    const {submitted, matchPasswords, confirmPassword, password, username, name, email} = this.state;
    
    return (
      <div className="container">
        <h1 className="title-proyect deepshadow">Proyecto ungrupo</h1>
        <div className="container-form-pad">
          <div className="container-form p-4">
            <h1 className="display-3 title-form">Sign up</h1>
            <form name="sign-up-form" onSubmit={this.handleSubmit}>
              <div className="form-left">
                { submitted && this.props.signUp.data && <div className='help-block text-center py-2 text-danger'>{this.props.signUp.data}</div> }
                <div className={'form-group pt-2' + (submitted && !username ? ' has-error': '')}>
                  <label htmlFor="username">Username:</label>
                  <input type="text" placeholder="username" className="form-control" id="username" name="username" value={username} onChange={this.handleChange}/>
                  { submitted && !username && <div><small>Username is required</small></div> }
                </div>
                <div className={'form-group' + (submitted && !name ? ' has-error': '')}>
                  <label htmlFor="name">Name:</label>
                  <input type="text" placeholder="First and second name" className="form-control" id="name" name="name" value={name} onChange={this.handleChange}/>
                  { submitted && !name && <div><small>Name is required</small></div> }
                </div>
                <div className={'form-group' + (submitted && !email ? ' has-error': '')}>
                  <label htmlFor="email">Email:</label>
                  <input type="text" placeholder="example@unal.edu.co" className="form-control" id="email" name="email" value={email} onChange={this.handleChange}/>
                  { submitted && !email && <div><small>Email is required</small></div> }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error': '')}>
                  <label htmlFor="password">Password:</label>
                  <input type="password" placeholder="password" className="form-control" id="password" name="password" value={password} onChange={this.handlePassword}/>
                  { submitted && !password && <div><small>Password is required</small></div> }
                  <small className="form-text text-muted">{'Security: ' + this.state.securityPassword}</small>
                </div>
                <div className={'form-group' + (submitted && (!matchPasswords || !confirmPassword) ? ' has-error': '')}>
                  <label htmlFor="confirmPassword">Confirm your password:</label>
                  <input type="password" placeholder="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={this.handleConfirmPassword}/>
                  { submitted && !matchPasswords && <div><small>Passwords doesnt match</small></div> }
                  { submitted && !confirmPassword && <div><small>Confirm password is required</small></div> }
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

function mapStateToProps(state) {
    const { users, signUp } = state;
    return {
        users,
        signUp
    };
}

export default connect(mapStateToProps)(Sign_up);