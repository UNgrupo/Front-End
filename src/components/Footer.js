import React, { Component } from 'react';

import '../styles/Footer.css';

export default class Footer extends Component {
  
  generateSocialLink = ( url, faIcon ) => {
    const listIcon = <li className='list-inline-item'>
                      <a href={url}>
                        <span className='fa-stack fa-mg'>
                          <i className='fa fa-circle fa-stack-2x' />
                          <i className={'fab ' + faIcon + ' fa-stack-1x fa-inverse'} />
                        </span>
                      </a>
                    </li>
    return listIcon;
  }

  render() {
    return (
      
      <footer className='background-footer'>
        
        <hr />

        <div className='row d-flex justify-content-center text-style-footer pt-3'>
          <div className='col-md-3'>
            <h3>&copy; 2018 proyecto UNGRUPO</h3>
            <hr />
            <p><small><b>Ungrupo</b> proyect was created in order to learn and understand web development using react in the front and ruby on rails in the back.</small></p>
            <p><small>The idea was developed by two students of <b>National University of Colombia</b> for <i>Software Engineering II</i> class</small></p>
          </div>
          <div className='col-md-3'>
            <h3>Contact us:</h3>
            <hr />
            <p>
              <small>
                The members of the team are <b><i>Camilo Esteban Nieto Barrera</i></b> and <b><i>Samael Salcedo</i></b> and you can contact via <a href='#'>ungrupo@hotmail.com</a> or calling us to 2341273461278
              </small>
            </p>
          </div>
          <div className='col-md-3'>
            <h3>Social media</h3>
            <hr />
            <ul className='list-inline'>
              {this.generateSocialLink( '#', 'fa-twitter' )}
              {this.generateSocialLink( '#', 'fa-pinterest' )}
              {this.generateSocialLink( '#', 'fa-facebook' )}
              {this.generateSocialLink( '#', 'fa-instagram' )}
              {this.generateSocialLink( '#', 'fa-linkedin' )}
            </ul>
          </div>
        </div>

      </footer>
    );
  }
  
}

/*
import twitter_logo from '../resources/twitter.png';
import pinterest_logo from '../resources/pinterest.png';
import facebook_logo from '../resources/facebook.png';
import linkedin_logo from '../resources/linkedin.png';
import instagram_logo from '../resources/instagram.png';

<div className='col align-left align-self-center'>
  <a href='#' >
    <img title='Twitter' alt='Twitter' src={twitter_logo} className='image'/>
  </a>
  <a href='#'>
    <img title='Pinterest' alt='Pinterest' src={pinterest_logo} className='image'/>
  </a>
  <a href='#'>
    <img title='Facebook' alt='Facebook' src={facebook_logo} className='image'/>
  </a>
  <a href='#'>
    <img title='LinkedIn' alt='LinkedIn' src={linkedin_logo} className='image'/>
  </a>
  <a href='#'>
    <img title='Instagram' alt='Instagram' src={instagram_logo} className='image'/>
  </a>
</div>
*/