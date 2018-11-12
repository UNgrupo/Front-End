import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/Navbar.css';
import Profile_icon from '../resources/Profile.png';
import Sign_out from '../resources/Sign out.png';

import userActions from '../_actions/actions-user';

class Navbar extends Component {
  
  componentDidMount(){
    console.log(window);
    this.props.dispatch( userActions.getById( window.localStorage.getItem( 'user-id' ) ) );
    console.log( this.props.user );
      
  }
  
  render() {
    
    return (
      <div className="container-fluid px-0 mx-0">
        <nav className="navbar navbar-collapse navbar-expand-lg navbar-dark bg-dark">
          <a href="/home"><span className="navbar-brand pl-2">Proyecto ungrupo</span></a>
          
        
          <form className="form-inline offset-md-4">
            <input className="form-control mr-2 input" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          
          <div className="collapse navbar-collapse offset-md-4" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                
                <Link className='nav-link' to={{ pathname: ( !this.props.user.attributes ? '' : this.props.user.attributes.usern ) }}>
                  <img className="img-nav" src={Profile_icon} alt="Profile" title="Profile" />
                </Link>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/"><img className="img-nav" src={Sign_out} alt="Sign out" title="Sign out" /></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.defaultProps = {
  user: {
    attributes: ''
  }
};

function mapStateToProps( state ){
  const { user } = state;
  return {
    user
  } ;
}

export default connect(mapStateToProps)(Navbar);
