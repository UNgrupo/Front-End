import React, { Component } from 'react';

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
      <div className='container-fluid px-0 mx-0'>
        <nav className='navbar navbar-collapse navbar-expand-lg navbar-dark bg-dark px-2 py-3'>

          <a href='/home'><span className='navbar-brand pl-2'><h4>Proyecto ungrupo</h4></span></a>
          
          <form className='form-inline offset-md-4'>
            <input className='form-control mr-2' type='search' placeholder='Search' aria-label='Search' />
            <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
          </form>
          
          <div className='collapse navbar-collapse offset-md-4' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item active'>
                <a href={'/' + this.state.username} className='no-decoration-a'>
                  <span className='fa-stack fa-mg fa-lg'>
                    <i class='fas fa-square fa-stack-2x fa-inverse' />
                    <i class='fas fa-user fa-stack-1x' />
                  </span>
                </a>
              </li>
              <li className='nav-item active'>
                <a href={'/'} className='no-decoration-a'>
                  <span className='fa-stack fa-mg fa-lg'>
                    <i class='fas fa-square fa-stack-2x fa-inverse' />
                    <i class='fas fa-sign-out-alt fa-stack-1x' />
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </nav>
      </div>
    );
  }
}

export default Navbar;
