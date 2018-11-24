import React, { Component } from 'react';

import '../styles/Loading.css';

export default class Loading extends Component {
    
    render(){
        
        return (
            <div class="container">
                <div class='loading-container'>
                  <h1 class='d-flex justify-content-center loading-title'>Loading</h1>
                  <div class='d-flex justify-content-center loading-title'>
                    <img src="https://thumbs.gfycat.com/CrazyAlienatedDrafthorse-size_restricted.gif" alt="Loading Icon" width="400" height="400" /> 
                  </div>
                </div>
            </div> 
        );
        
    }
    
}