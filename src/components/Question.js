import React, {Component} from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import sortAlgorithms from '../scripts/orderData';
import userActions from '../_actions/actions-user';
import questionActions from '../_actions/actions-question';
import answerActions from '../_actions/actions-answer';
import commentActions from '../_actions/actions-comment';

import '../styles/Question.css';
import Thumb_up from '../resources/thumb-up.jpg';
import Thumb_down from '../resources/thumb-down.jpg';

class Question extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            user_question: {attributes: {name: ''}},
        };
        
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    }
    
    async componentDidMount(){
          const {question_id} = this.props.match.params;
          const {dispatch} = this.props;
          
          await dispatch( questionActions.getById( question_id ) );
          
          await dispatch( userActions.getAll() );
          
          await dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );
          
          await dispatch( commentActions.getAllCommentsOfQuestion(  ) );
    }
    
    async handleClick(answer, number){ //IMPORTANTE Revisar como reenderizar el componente
        const ans = answer.target.value.split(',');
        const data = {
            qualification: parseInt(ans[1], 10) + number
        };
        
        await this.props.dispatch( answerActions.update( ans[0], data) );
        window.location.href = "/questions/"+this.props.match.params.topic_id+'/'+this.props.match.params.question_id;
    }
    
    handleClickUp(answer){
        this.handleClick(answer, 1);
    }
    
    handleClickDown(answer){
        this.handleClick(answer, -1);
    }
    
    handleSubmitComment(e){
        
        e.preventDefault();
        
        const data = {
            description: e.target.elements._comment.value,
            date: (new Date()).toUTCString(),
            user_id: window.localStorage.getItem( 'user-id' ),
            answer_id: e.target.elements._answer_id.value
        };
        
        this.props.dispatch( commentActions.addNew( data ) );
        
        window.location.href = "/questions/"+this.props.match.params.topic_id+'/'+this.props.match.params.question_id;
    }
    
    handleSubmitAnswer(e){
        
        e.preventDefault();
        
        const data = {
            description: e.target.elements._answer.value,
            qualification: 0,
            date: (new Date()).toUTCString(),
            user_id: window.localStorage.getItem( 'user-id' ),
            question_id: this.props.match.params.question_id
        };
        
        this.props.dispatch( answerActions.addNew( data ) );
        
        window.location.href = "/questions/"+this.props.match.params.topic_id+'/'+this.props.match.params.question_id;
    }
    
    render(){
        
        //if( this.props.comment.data && !this.props.answer.data )
            //this.props.dispatch( commentActions.getAllCommentsOfQuestion( this.props.answer, sortAlgorithms.orderDateGreater ) ); //revisar como sacar los comentarios
        
        console.log(this.props.comment);
        
        let comments = [];
        
        if( !this.props.comment.data )
            for(let i=0; i<this.props.comment.length; i++){
                comments.push(
                    this.props.comment[i].map(comment => {
                        const userComment = this.props.user[comment.attributes['user-id']-1].attributes;
                        return(
                            <div key={comment.id} className="media p-3 container-form-comment mb-1 mt-1"> 
                                <img src={userComment.photo} alt={userComment.name} className="mr-3 mt-3 rounded-circle" />
                                <div className="media-body">
                                    <h4>{userComment.name + "    "}      
                                        <small><i>{comment.attributes.date}</i></small>
                                    </h4>
                                    <p>{comment.attributes.description}</p>
                                </div>
                            </div>
                        );
                    })
                );
            }
        
        let answers = [];
        if( !this.props.answer.data )
            answers = this.props.answer.map((answer,i) => {
                
                let userAnswer = {};
                if( this.props.user && !this.props.user.data ){
                    userAnswer = this.props.user[answer.attributes['user-id']-1].attributes;
                    
                    return(
                        <div key={answer.id} className="media p-3 container-form-2"> 
                            <img src={userAnswer.photo} alt={userAnswer.name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{userAnswer.name + "    "}      
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
                }
                return <div key={i}></div>;
            
            });
        
        const { question } = this.props;
        let userQuestionId = 0;
        if( question.data.attributes )
            userQuestionId = this.props.question.data.attributes['user-id'];
        
        return(
            <div>
            
                <Navbar />
                
                <div className="container">
                    <div className="px-5 mx-5">
                        <h2 className="text-center my-5">{(question.data.attributes ? question.data.attributes.title : '')}</h2>
                        
                        <div className="media p-3 container-form-comment mb-1 mt-1"> 
                            <img src={(this.props.user[userQuestionId] ? this.props.user[userQuestionId].attributes.photo : '')} alt={(this.props.user[userQuestionId] ? this.props.user[userQuestionId].attributes.name : '')} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{(this.props.user[userQuestionId] ? this.props.user[userQuestionId].attributes.name : '') + "    "}      
                                    <small><i>{(question.data.attributes ? question.data.attributes.date : '')}</i></small>
                                </h4>
                                <p>{(question.data.attributes ? question.data.attributes.description : '')}</p>
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

function mapStateToProps( state ){
    const {user, answer, question, comment} = state;
    return {
        user,
        answer,
        question,
        comment
    };
}

export default connect(mapStateToProps)(Question);