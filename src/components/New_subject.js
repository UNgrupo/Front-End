import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import api_route from '../route';

import '../styles/Form.css';
import '../styles/Titles.css';

class New_subject extends Component{
    
    constructor(props){
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();
        
        const name = document.getElementById('_name').value;
        
        const data = {
            name,
            number_of_topics: 0
        };
        
        axios.post(api_route + "subjects", data)
        .then(response => {
            window.location.href = "/home";
        })
        .catch(error => {
          alert(error.message, error.response);
        });
        
    }
    
    render(){
        
        return(
            <div>
                
                <Navbar />
                
                <div className="panel py-5 my-5 container">
                    <div className="container-form-pad ">
                        <div className="container-form-2">
                            <div className="panel-heading my-3 text-center">
                                <h1 className="title-l">New Subject</h1>
                            </div>
                            <div className="panel-body px-5">
                                <form onSubmit={ this.handleSubmit } className="pt-3">
                                    <div className="form-group">
                                        <label htmlFor="_name">Name(*):</label>
                                        <input type="text" className="form-control" id="_name" name="_name" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="_description">Description:</label>
                                        <input type="text" className="form-control" id="_description" name="_description" />
                                    </div>
                                    <div className="row pt-3 mb-5">
                                        <div className="col">
                                            <input type="submit" className="btn btn-success btn-block active" value="Add me!" />
                                        </div>
                                        <div className="col">
                                            <a href="/home">
                                                <input className="btn btn-danger btn-block active" value="Go back!" />
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

export default New_subject;