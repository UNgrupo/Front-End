import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';

import '../styles/Questions.css'

class Questions extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      questions: [],
      users: []
    }
    
    this.getUser = this.getUser.bind(this);
    
  }
  
  async componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    axios.get('https://back-end-project-caenietoba.c9users.io/questions')
    .then(response => {
      let questions = [];
      for(let i=0; i<response.data.length; i++){
        if(response.data[i].topic_id == topic_id){
          questions.push(response.data[i]);
        }
      }
      axios.get('https://back-end-project-caenietoba.c9users.io/users')
      .then(res => {
        this.setState({
          users: res.data,
          questions
        });
      });
    });
  }
  
  async getUser(id){ /*tratando de acceder a la promesa*/
    const user = await axios.get('https://back-end-project-caenietoba.c9users.io/users/'+id)
    console.log(typeof(user.data.name))
    return await user.data.name
  }
  
  render() {
    
    const questions = this.state.questions.map((question, i) => {
      return(
        
        <div className="panel border-panel">
          <div className="panel-body px-5 py-3">
            <a href={"/questions/"+this.props.match.params.topic_id+'/'+question.id} className="no-decoration-a">
              <h4>{question.title}</h4>
            </a>
            <div className="row">
              <div className="col">
                {/*this.getUser(question.user_id)*/} {/*tratando de acceder a la promesa*/}
                <a href='#'>{this.state.users[question.user_id-1].name}</a>
              </div>
              <div className="col">
                {question.date}
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