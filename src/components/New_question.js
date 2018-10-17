import React, { Component } from 'react';
import axios from 'axios';

import Footer from './Footer.js';
import Navbar from './Navbar.js';
import api_route from '../route';

class New_question extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      topic: ""
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    axios.get(api_route + 'topics/' + topic_id)
    .then(response => {
      this.setState({
        topic: response.data.data
      });
    })
    .catch(error => {
      alert(error.message);
    });
    
  }
  
  handleSubmit(e){
    
    e.preventDefault();
    
    const data = { 
      title: document.getElementById('_title').value,
      description: document.getElementById('_description').value,
      date: (new Date()).toUTCString(),
      user_id: 1,//hay que cambiar esto para que agregue dependiendo del usuario IMPORTANTISIMO
      topic_id: this.state.topic.id
    };
    
    axios.post(api_route + 'questions', data)
    .then(response => {
      alert("Question added.");
      window.location.href = "/questions/" + this.state.topic.id;
    })
    .catch(error => {
      alert(error.message, error.response);
    });
  }
  
  render() {
    return (
        <div>
                
          <Navbar />
          
          <div className="panel py-5 my-5 container">
            <div className="container-form-pad ">
              <div className="container-form-2">
                <div className="panel-heading my-3 text-center">
                  <h1 className="title-l">New Question of {this.state.topic.name} </h1>
                </div>
                <div className="panel-body px-5">
                  <form onSubmit={ this.handleSubmit } className="pt-3">
                    <div className="form-group">
                      <label htmlFor="_title">Title(*):</label>
                      <input type="text" className="form-control" id="_title" name="_title" required />
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
                        <a href={"/questions/"+this.state.topic.id}>
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

export default New_question;