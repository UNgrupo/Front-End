import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Footer from './Footer';

import userActions from '../_actions/actions-user';

class Update_profile extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
          matchPassword: true,
          errormessage: '',
          username: '',
          name: '',
          password: '',
          confirmPassword: '',
          submitted: false
        };
        
        this.updateProfile = this.updateProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        this.props.dispatch( userActions.getById( window.localStorage.getItem( 'user-id' ) ) );
    }
    
    async updateProfile(e){
        e.preventDefault();
        
        var updateInfo = {};
        const {username, name, password, confirmPassword} = this.state;
        
        if( password !== confirmPassword ){
          this.setState({
            matchPassword: false,
            submitted: true
          });
          return;
        }
        
        if( password )
          updateInfo.password = password;
        if( username )
          updateInfo.usern = username;
        if( name )
          updateInfo.name = name;
          
          console.log( updateInfo );
          
        if( password || username || name ){
          await this.props.dispatch( userActions.update( window.localStorage.getItem( 'user-id' ), updateInfo ) );
          if( this.props.user === 'USER updated' ){
            (window.location.href = '/home');
          }
          await this.setState({
            errorMessage: this.props.user,
            submitted: true
          });
        }
    }
    
    handleChange(e){
      const { name, value } = e.target;
      this.setState({
        [name]: value,
        submitted: false
      });
    }
    
    render(){
      
      const { submitted, matchPassword, name, username, password, confirmPassword, errorMessage } = this.state;
      
      return(
        <div>
              
          <Navbar />
          
          <div className='panel py-5 my-5 container'>
            <div className='container-form-pad '>
              <div className='container-form-2'>
                <div className='panel-heading my-3 text-center'>
                  <h1 className='title-l'>Update your profile</h1>
                </div>
                <div className='panel-body px-5'>
                  { submitted && errorMessage && <div className='help-block text-danger text-center'><big>{errorMessage}</big></div> }
                  <form onSubmit={ this.updateProfile } className='pt-3'>
                    <div className='form-group'>
                      <label htmlFor='username'>Username:</label>
                      <input type='text' className='form-control' id='username' name='username' value={username} onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='name'>Full name:</label>
                      <input type='text' className='form-control' id='name' name='name' value={name} onChange={this.handleChange}/>
                    </div>
                    <div className={'form-group' + (submitted && !matchPassword ? ' has-error' : '')}>
                      <label htmlFor='password'>Password:</label>
                      <input type='text' className='form-control' id='password' name='password' value={password} onChange={this.handleChange}/>
                      <label htmlFor='confirmPassword' className='mt-3'>Confirm the password:</label>
                      <input type='text' className='form-control' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={this.handleChange}/>
                      { submitted && !matchPassword && <div className='help-block'><small>Passwords must match</small></div> }
                    </div>
                    <div className='row pt-3 mb-5'>
                      <div className='col'>
                        <input type='submit' className='btn btn-success btn-block active' defaultValue='Add me!' />
                      </div>
                      <div className='col'>
                        <a href='/my_profile'>
                          <input className='btn btn-danger btn-block active' defaultValue='Go back!' />
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        
        </div>
      );
    }
    
}

function mapStateToProps(state){
    const {user} = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(Update_profile)