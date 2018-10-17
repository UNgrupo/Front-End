import React, {Component} from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import api_route from '../route';
import {order_qualification, order_date} from '../scripts/orderData';

import '../styles/Question.css';
import Thumb_up from '../resources/thumb-up.jpg';
import Thumb_down from '../resources/thumb-down.jpg';

class Question extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            question: {attributes: {}},
            user_question: {attributes: {name: ''}},
            users: [],
            answers: [], 
            comments: []
        };
        
        this.order_qualification = this.order_qualification.bind(this);
        this.order_date = this.order_date.bind(this);
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    }
    
    order_qualification(a, b){
        if (a.attributes.qualification < b.attributes.qualification)
            return 1;
        if (a.attributes.qualification > b.attributes.qualification)
            return -1;           
        return 0;
    }
    
    order_date(a, b){
        if (a.attributes.date < b.attributes.date)
            return 1;
        if (a.attributes.date > b.attributes.date)
            return -1;           
        return 0;
    }
    
    async componentDidMount(){
          const {question_id} = this.props.match.params;
          
          await axios.get(api_route + 'questions/' + question_id)
          .then(response => {
              this.setState({
                  question: response.data.data
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get(api_route + 'users/' + this.state.question.attributes['user-id'])
          .then(response => {
              this.setState({
                  user_question: response.data.data
              });
          });
          
          await axios.get(api_route + 'users')
          .then(response => {
              this.setState({
                  users: response.data.data
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get(api_route + 'answers')
          .then(response => {
              let answers = [];
              const resAnswers = response.data.data;
              for(let i=0; i<resAnswers.length; i++){
                  if(resAnswers[i].attributes['question-id'] == question_id)
                    answers.push(resAnswers[i]);
              }
              //answers.sort(order_qualification);
              answers.sort(this.order_qualification);
              this.setState({
                  answers
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get(api_route + 'comments')
          .then(response => {
              let comments = [];
              const resComments = response.data.data;
              
              for(let i=0; i<this.state.answers.length; i++){
                  let comments_i = [];
                  for(let j=0; j<resComments.length; j++){
                      if(this.state.answers[i].id == resComments[j].attributes['answer-id']){
                          comments_i.push(resComments[j]);
                      }
                  }
                  comments.push(comments_i);
              }
              //comments.sort(order_date);
              comments.sort(this.order_date);
              this.setState({
                  comments
              });
          })
          .catch(error => {
              alert(error.message);
          });
    }
    
    handleClick(answer, number){ //IMPORTANTE Revisar como reenderizar el componente
        const ans = answer.target.value.split(',');
        const data = {
            qualification: parseInt(ans[1], 10) + number
        }
        axios.put(api_route + 'answers/' + ans[0], data)
        .then(response => {
            this.forceUpdate();
            this.setState();
        })
        .catch(error => {
            alert(error.message);
        });
    }
    
    handleClickUp(answer){
        this.handleClick(answer, 1);
    }
    
    handleClickDown(answer){
        this.handleClick(answer, -1);
    }
    
    handleSubmitComment(e){
        
        const data = {
            description: e.target.elements._comment.value, //Forma de acceder a los valores de el evento por onSubmit
            date: (new Date()).toUTCString(),
            user_id: 1, //Depende del usuario actual.... IMPORTANTE
            answer_id: e.target.elements._answer_id.value
        };
        
        axios.post(api_route + 'comments', data)
        .then(response => {
            alert("Comment Added");
        })
        .catch(error => {
            if(error.response.status === 422){
                alert("Length too short, please be sure to use minimun 15 characters");   
            }
        });
    }
    
    handleSubmitAnswer(e){
        
        const data = {
            description: e.target.elements._answer.value,
            qualification: 0,
            date: (new Date()).toUTCString(),
            user_id: 1, //Depende del usuario actual.... IMPORTANTE
            question_id: this.props.match.params.question_id
        }
        
        axios.post(api_route + 'answers', data)
        .then(response => {
            alert("Answer Added");
        })
        .catch(error => {
            if(error.response.status === 422){
                alert("Length too short, please be sure to use minimun 15 characters");   
            }
        });
    }
    
    render(){
        
        let comments = [];
        
        for(let i=0; i<this.state.comments.length; i++){
            comments.push(
                this.state.comments[i].map(comment => {
                    return(
                        <div key={comment.id} className="media p-3 container-form-comment mb-1 mt-1"> 
                            <img src={this.state.users[comment.attributes['user-id']-1].attributes.photo} alt={this.state.users[comment.attributes['user-id']-1].attributes.name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{this.state.users[comment.attributes['user-id']-1].attributes.name + "    "}      
                                    <small><i>{comment.attributes.date}</i></small>
                                </h4>
                                <p>{comment.attributes.description}</p>
                            </div>
                        </div>
                    );
                })
            );
        }
        
        const answers = this.state.answers.map((answer,i) => {
            return(
                <div key={answer.id} className="media p-3 container-form-2"> 
                    <img src={this.state.users[answer.attributes['user-id']-1].attributes.photo} alt={this.state.users[answer.attributes['user-id']-1].attributes.name} className="mr-3 mt-3 rounded-circle" />
                    <div className="media-body">
                        <h4>{this.state.users[answer.attributes['user-id']-1].attributes.name + "    "}      
                            <small><i>{answer.attributes.date}</i></small>
                        </h4>
                        <p>{answer.attributes.description}</p>
                        <div className="row txt-r">
                            <p className="pr-2">Qualification: {answer.attributes.qualification}</p>
                            <input type="image" alt="Thumb up" src={Thumb_up} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickUp} />
                            <input type="image" alt="Thumb down" src={Thumb_down} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickDown} />
                        </div>
                        <form onSubmit={this.handleSubmitComment}>
                            <div className="form-group shadow-textarea">
                                <label htmlFor="_comment"><small>Comments</small></label>
                                <textarea className="form-control z-depth-1" id="_comment" name="_comment" rows="3" placeholder="Write your comment here..."></textarea>
                            </div>
                            <input type="hidden" id="_answer_id" name="_answer_id" value={answer.id} />
                            <div className="txt-r">
                                <input type="submit" className="btn btn-success active" value="Submit comment!" />
                            </div>
                        </form>
                        {comments[i]}
                    </div>
                </div>
            );
        });
        
        return(
            <div>
            
                <Navbar />
                
                <div className="container">
                    <div className="px-5 mx-5">
                        <h2 className="text-center my-5">{this.state.question.attributes.title}</h2>
                        
                        <div className="media p-3 container-form-comment mb-1 mt-1"> 
                            <img src={this.state.user_question.attributes.photo} alt={this.state.user_question.attributes.name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{this.state.user_question.attributes.name + "    "}      
                                    <small><i>{this.state.question.attributes.date}</i></small>
                                </h4>
                                <p>{this.state.question.attributes.description}</p>
                            </div>
                        </div>
                        
                        <h4 className="text-center my-5">...Answers...</h4>
                        {answers}
                        <form onSubmit={this.handleSubmitAnswer} className="p-4 container-form-2">
                            <div className="form-group shadow-textarea">
                                <label htmlFor="_answer">New answer</label>
                                <textarea className="form-control z-depth-1" id="_answer" name="_answer" rows="3" placeholder="Write your answer here..."></textarea>
                            </div>
                            <div className="txt-r">
                                <input type="submit" className="btn btn-success active" value="Submit Answer!" />
                            </div>
                        </form>
                        
                    </div>
                </div>
                
                <Footer />
            
            </div>
        );
    }
}

export default Question;