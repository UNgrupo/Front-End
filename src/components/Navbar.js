import React, { Component } from 'react';

import '../styles/Navbar.css';
import Profile_icon from '../resources/Profile.png';
import Sign_out from '../resources/Sign out.png';

class Navbar extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      username: ''
    };
  }
  
  componentDidMount(){
    this.setState({
      username: JSON.parse(window.localStorage.getItem( 'user' )).attributes.usern
    });
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
                
                <a href={'/' + this.state.username} className="nav-link">
                  <img className="img-nav" src={Profile_icon} alt="Profile" title="Profile" />
                </a>
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

export default Navbar;
