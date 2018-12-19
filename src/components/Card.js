import React, {Component} from 'react';

import '../styles/Card.css';

class Card extends Component{
    
    render(){
        return(
            
            <div className='col-md-4 no-decoration'>
              <a href={this.props.route} >
                <div className='card-style'>
                <div className='card my-3 image-card card-style' >
                  <div className='card-style'>
                    <img src={'https://source.unsplash.com/random?sig=' + Math.floor((Math.random() * 100) + 1)} width='100%' height='200' alt='card' className='image-card card-style'/> 
                    {this.props.description && <p className='mt-1'>{this.props.description}</p>}
                  </div>
                  <div className='card-footer'>
                    {this.props.title}
                  </div>
                </div>
                </div>
              </a>
            </div>
            
        );
    }
    
}

export default Card;