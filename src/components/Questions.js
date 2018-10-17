import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import api_route from '../route';

import '../styles/Questions.css';

class Questions extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      users: []
    };
    
  }
  
  async componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    await axios.get(api_route + 'questions')
    .then(response => {
      let questions = [];
      const resQuestions = response.data.data;
      for(let i=0; i<resQuestions.length; i++){
        if(resQuestions[i].attributes['topic-id'] == topic_id){
          questions.push(resQuestions[i]);
        }
      }
      axios.get(api_route + 'users')
      .then(res => {
        this.setState({
          users: res.data.data,
          questions
        });
      });
    });
  }
  
  render() {
    
    const questions = this.state.questions.map((question, i) => {
      return(
        
        <div className="panel border-panel">
          <div className="panel-body px-5 py-3">
            <a href={"/questions/"+this.props.match.params.topic_id+'/'+question.id} className="no-decoration-a">
              <h4>{question.attributes.title}</h4>
              <h4>Hola</h4>
            </a>
            <div className="row">
              <div className="col">
                <a href='#'>{this.state.users[question.attributes['user-id']-1].attributes.name}</a>
              </div>
              <div className="col">
                {question.attributes.date}
              </div>
            </div>
          </div>
        </div>
      );
    });
    
    return (
      <div>
        <Navbar />
        
        <div className="content">
          <div className="px-5 mx-5">
            <h1 className="text-center my-4">Questions</h1>
            <div className="panel border-panel">
              <div className="panel-body px-5 py-3">
                <a href={"/questions/new_question/"+this.props.match.params.topic_id} className="no-decoration-a">
                  <h4>Add a new question</h4>
                </a>
              </div>
            </div>
            {questions}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default Questions;