import React, { Component } from 'react';
import '../styles/Footer.css';
import twitter_logo from '../resources/twitter.png';
import pinterest_logo from '../resources/pinterest.png';
import facebook_logo from '../resources/facebook.png';
import linkedin_logo from '../resources/linkedin.png';
import instagram_logo from '../resources/instagram.png';

class Footer extends Component {
  
  render() {
    return (
      <footer>
        <hr class="hr"/>
        <div className="row align">
          <div className="col align-right">
              <p className="move-content-y">&copy; 2018 proyecto UNGRUPO</p>
          </div>
          <div className="col">
            <address>
              <a href="">caenietoba@unal.edu.co</a> <br />
              <a href="">caenietoba@unal.edu.co</a> <br />
              <a href="">caenietoba@unal.edu.co</a> <br />
              <a href="">caenietoba@unal.edu.co</a> <br />
              <p>Telefono contacto: 123123</p>
            </address>
          </div>
          <div className="col align-left">
            <div className="move-content-y">
              <a href="[full link to your Twitter]" >
                <img title="Twitter" alt="Twitter" src={twitter_logo} className="image"/>
              </a>
              <a href="[full link to your Pinterest]">
                <img title="Pinterest" alt="Pinterest" src={pinterest_logo} className="image"/>
              </a>
              <a href="[full link to your Facebook page]">
                <img title="Facebook" alt="Facebook" src={facebook_logo} className="image"/>
              </a>
              <a href="[full link to your LinkedIn]">
                <img title="LinkedIn" alt="LinkedIn" src={linkedin_logo} className="image"/>
              </a>
              <a href="[full link to your Instagram]">
                <img title="Instagram" alt="RSS" src={instagram_logo} className="image"/>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
}

export default Footer;