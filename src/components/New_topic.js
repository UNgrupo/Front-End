import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

class New_topic extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            questions_number: 0,
            subject: 0
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        const { subject_id } = this.props.match.params;
        axios.get('https://back-end-project-caenietoba.c9users.io/subjects/' + subject_id)
        .then(response => {
            this.setState({
                subject: response.data
            });
        });
    }
    
    handleSubmit(e){
        e.preventDefault;
        
        const name = document.getElementById('_name').value;
        
        const new_topic = {
            name,
            subject_id: this.state.subject.id
        }
        
        axios.post('https://back-end-project-caenietoba.c9users.io/topics', new_topic)
        .then(response => {
            alert("Topic added")
            window.location.href = "/topics/" + this.state.subject.id;
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
                                <h1 className="title-l">New Topic of {this.state.subject.name} </h1>
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
                                            <a href={"/topics/"+this.state.subject.id}>
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

export default New_topic;
