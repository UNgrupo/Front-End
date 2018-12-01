import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Footer from './Footer.js';

import userActions from '../_actions/actions-user.js';

import '../styles/Log-in.css';
import '../styles/Titles.css';

class Log_in extends Component {
  
  constructor(props){
        super(props);
        
        if( !this.props.authentication.logged_in )
          this.props.dispatch(userActions.logout());
        
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }
  
  async handleSubmit(e){
    
    e.preventDefault();
    
    const user = {
        email: e.target.elements.email.value,
        password: e.target.elements.password.value
    };
    const { dispatch } = this.props;
    
    if (user.email && user.password) {
        await dispatch(userActions.login( user ));
    }
    
    this.setState({ 
      submitted: true
    });
    
  }
  
  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      submitted: false
    });
  }
  
  responseFacebook( response ){
    this.props.dispatch( userActions.loginFacebook( response ) ); //revisar como hacer para que solo ingrese cuadno se le pide oprimiendo el boton
  }
  
  render() {
    
    const {submitted, email, password} = this.state;
    const { data, logged_in, loginSocial } = this.props.authentication;
      
    const responseGoogle = (response) => {
      
    };
      
    if( logged_in && !loginSocial )
      window.location.href = '/home'; 
      
    return (
      
      <div>

        <h1 className='title-proyect deepshadow'>Proyecto ungrupo</h1>

        <div className='container'>

          <div className='form-container form-container-margin p-4'>

            <h1 className='title-form'>Log in</h1>

            <form className='form' onSubmit={this.handleSubmit}>
              {submitted && !logged_in && email && password && <div className='help-block text-center py-2 text-danger'>{ data }</div>}
              {submitted && logged_in && email && password && <div className='help-block text-center py-2 text-success'><big>{ data }</big></div>}
              <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                <label className='control-label' htmlFor='email'>Email:</label>
                <input type='text' className='form-control' placeholder='email' id='email' name='email' value={email} onChange={this.handleChange}/>
                {submitted && !email && <div className='help-block'><small>email is required</small></div>}
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor='password'>Password:</label>
                <input type='password' className='form-control' placeholder='password' id='password' name='password' value={password} onChange={this.handleChange}/>
                {submitted && !password && <div className='help-block'><small>Password is required</small></div>}
              </div>
              <div className='pt-4'>
                <input type='submit' className='btn btn-success btn-block active' value='Log me in!' />
              </div>
              <div className='row pt-4'>
                <div className='col text-center center-aling'>
                  <a href='#'>Did you forget password?</a>
                </div>
                <div className='col text-center'>
                  <a href='/sign_up'>Want to sign up?</a>
                </div>
              </div>
              <div className='form-inline d-flex justify-content-around py-3'>
                <GoogleLogin
                  clientId='681896092557-qee8kcngrao8jmjqsrn36f3mjkaia9dh.apps.googleusercontent.com'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  className='loginBtn loginBtn--google'
                />
                <FacebookLogin 
                  appId='1978366042223188'
                  autoLoad={true}
                  fields='name,email,picture'
                  callback={this.responseFacebook}
                  cssClass='loginBtn loginBtn--facebook'
                  xfbml={true}
                />
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
  const { authentication } = state;
  return {
      authentication
  };
}

export default connect(mapStateToProps)(Log_in);

//2245067805765444
//1978366042223188
//tnzjjgjjve_1540777059@tfbnw.net
//1598753
//https://www.oauthlogin.com/documentation.html