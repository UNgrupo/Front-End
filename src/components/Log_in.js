import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer.js';
import userActions from '../_actions/actions-user.js';

import '../styles/Log_in-Sign_up.css';


class Log_in extends Component {
  
  constructor(props){
        super(props);
        
        this.props.dispatch(userActions.logout());
        
        this.state = {
            username: '',
            password: '',
            submitted: false,
            match: true
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
  async componentDidMount(){
    await this.props.dispatch(userActions.getAll());
  }
    
  async handleSubmit(e){
    
    e.preventDefault();
    
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const { users, dispatch } = this.props;
    
    if (username && password) {
        await dispatch(userActions.login(users, username, password)); //Users es solo necesario en este momento por que no tengo forma de acceder a la api de otras forma, cambiar tambien en users-actions
    }
    
    this.setState({ 
      submitted: true,
      match: false
    });
    
  }
  
  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      match: true
    });
  }
  
  render() {
    
    const {submitted, username, password, match} = this.state;
    
    return (
      <div className="container">
        <h1 className="title-proyect deepshadow">Proyecto ungrupo</h1>
        <div className="container-form-pad">
          <div className="container-form p-4">
            <h1 className="display-3 title-form">Log in</h1>
            <form className="form" onSubmit={this.handleSubmit}>
              {submitted && !match && <div className='help-block text-center py-2 text-danger'>The user doesnt exist or the password doesnt match</div>}
              <div className={"form-group" + (submitted && !username ? " has-error" : '')}>
                <label className="control-label" htmlFor="username">Username (*):</label>
                <input type="text" className="form-control" placeholder="username" id="username" name="username" value={username} onChange={this.handleChange}/>
                {submitted && !username && <div className="help-block"><small>Username is required</small></div>}
              </div>
              <div className={"form-group" + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor="password">Password (*):</label>
                <input type="password" className="form-control" placeholder="password" id="password" name="password" value={password} onChange={this.handleChange}/>
                {submitted && !password && <div className="help-block"><small>Password is required</small></div>}
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

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

export default connect(mapStateToProps)(Log_in)