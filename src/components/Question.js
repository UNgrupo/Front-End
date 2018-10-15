import React, {Component} from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';

import '../styles/Question.css';
import Thumb_up from '../resources/thumb-up.jpg';
import Thumb_down from '../resources/thumb-down.jpg';

class Question extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            question: "",
            user_question: "",
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
        if (a.qualification < b.qualification)
            return 1;
        if (a.qualification > b.qualification)
            return -1;           
        return 0;
    }
    
    order_date(a, b){
        if (a.date < b.date)
            return 1;
        if (a.date > b.date)
            return -1;           
        return 0;
    }
    
    async componentDidMount(){
          const {question_id} = this.props.match.params;
          
          await axios.get('https://back-end-project-caenietoba.c9users.io/questions/' + question_id)
          .then(response => {
              this.setState({
                  question: response.data
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get('https://back-end-project-caenietoba.c9users.io/users/' + this.state.question.user_id)
          .then(response => {
              this.setState({
                  user_question: response.data
              });
          });
          
          await axios.get('https://back-end-project-caenietoba.c9users.io/users')
          .then(response => {
              this.setState({
                  users: response.data
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get('https://back-end-project-caenietoba.c9users.io/answers')
          .then(response => {
              let answers = [];
              for(let i=0; i<response.data.length; i++){
                  if(response.data[i].question_id == question_id)
                    answers.push(response.data[i]);
              }
              answers.sort(this.order_qualification);
              this.setState({
                  answers
              });
          })
          .catch(error => {
              alert(error.message);
          });
          
          await axios.get('https://back-end-project-caenietoba.c9users.io/comments')
          .then(response => {
              let comments = [];
              
              for(let i=0; i<this.state.answers.length; i++){
                  let comments_i = [];
                  for(let j=0; j<response.data.length; j++){
                      if(this.state.answers[i].id == response.data[j].answer_id){
                          comments_i.push(response.data[j]);
                      }
                  }
                  comments.push(comments_i);
              }
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
        const ans = answer.target.value.split(',')
        axios.put('https://back-end-project-caenietoba.c9users.io/answers/'+ans[0], {qualification: parseInt(ans[1]) + number})
        .then(response => {
            this.forceUpdate()
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
        
        axios.post('https://back-end-project-caenietoba.c9users.io/comments', data)
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
        
        axios.post('https://back-end-project-caenietoba.c9users.io/answers', data)
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
                            <img src={this.state.users[comment.user_id-1].photo} alt={this.state.users[comment.user_id-1].name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{this.state.users[comment.user_id-1].name + "    "}      
                                    <small><i>{comment.date}</i></small>
                                </h4>
                                <p>{comment.description}</p>
                            </div>
                        </div>
                    );
                })
            );
        }
        
        const answers = this.state.answers.map((answer,i) => {
            return(
                <div key={answer.id} className="media p-3 container-form-2"> 
                    <img src={this.state.users[answer.user_id-1].photo} alt={this.state.users[answer.user_id-1].name} className="mr-3 mt-3 rounded-circle" />
                    <div className="media-body">
                        <h4>{this.state.users[answer.user_id-1].name + "    "}      
                            <small><i>{answer.date}</i></small>
                        </h4>
                        <p>{answer.description}</p>
                        <div className="row txt-r">
                            <p className="pr-2">Qualification: {answer.qualification}</p>
                            <input type="image" src={Thumb_up} className="image-like" value={[answer.id, answer.qualification]} onClick={this.handleClickUp} />
                            <input type="image" src={Thumb_down} className="image-like" value={[answer.id, answer.qualification]} onClick={this.handleClickDown} />
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
                        <h2 className="text-center my-5">{this.state.question.title}</h2>
                        
                        <div className="media p-3 container-form-comment mb-1 mt-1"> 
                            <img src={this.state.user_question.photo} alt={this.state.user_question.name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{this.state.user_question.name + "    "}      
                                    <small><i>{this.state.question.date}</i></small>
                                </h4>
                                <p>{this.state.question.description}</p>
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