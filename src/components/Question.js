import React, {Component} from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Rich_text_editor from './Rich_text_editor.js';
import Show_text from './Show_text.js';
import Loading from './Loading.js';

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
            Answer: {
                submitted: false,
                answer: ''
            },
            Comment: {
                submitted: false,
                answerId: 0, 
                comment: ''
            },
            commentError: '',
            shouldUpdate: false
        };
        
        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }
    
    async componentDidMount(){
        //this.setState({shouldUpdate: false});
        
          const {question_id} = this.props.match.params;
          const {dispatch} = this.props;
          
          await dispatch( questionActions.getById( question_id ) );
          
          await dispatch( userActions.getAll() );
          
          await dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );
          
          await dispatch( commentActions.getAllCommentsOfQuestion() );
          
        this.setState({shouldUpdate: true});
    }
    
    async handleClick(answer, number){ 
        const ans = answer.target.value.split(',');
        const data = {
            qualification: parseInt(ans[1], 10) + number
        };
        
        await this.props.dispatch( answerActions.update( ans[0], data) ); //Revisar lo de cors
        window.location.href = "/questions/"+this.props.match.params.topic_id+'/'+this.props.match.params.question_id;
    }
    
    handleClickUp(answer){
        this.handleClick(answer, 1);
    }
    
    handleClickDown(answer){
        this.handleClick(answer, -1);
    }
    
    handleCommentChange(text){
        this.setState({
            Comment: { 
                comment: text
            }
        });
    }
    
    handleAnswerChange(text){
        this.setState({
            Answer: { 
                answer: text
            }
        });
    }
    
    async handleSubmitComment(e){
        
        e.preventDefault();
        
        const data = {
            description: JSON.stringify(this.state.Comment.comment),
            date: (new Date()).toUTCString(),
            user_id: window.localStorage.getItem( 'user-id' ),
            answer_id: e.target.elements._answer_id.value
        };
        
        await this.props.dispatch( commentActions.addNew( data ) );
        
        await this.setState({
            Comment: { 
                submitted: true
            },
            commentError: (this.props.comment.data && this.props.comment.data.data && this.props.comment.data.data.description ? this.props.comment.data.data.description[0] : '')
        });
        
        await this.props.dispatch( commentActions.getAllCommentsOfQuestion() );
        
    }
    
    async handleSubmitAnswer(e){
        
        e.preventDefault();
        
        const data = {
            description: JSON.stringify(this.state.Answer.answer),
            qualification: 0,
            date: (new Date()).toUTCString(),
            user_id: window.localStorage.getItem( 'user-id' ),
            question_id: this.props.match.params.question_id
        };
        
        this.props.dispatch( answerActions.addNew( data ) );
        
        this.setState({
            Answer: { submitted: true }
        });
        
        const {question_id} = this.props.match.params;
        await this.props.dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );
        
        //window.location.href = "/questions/"+this.props.match.params.topic_id+'/'+this.props.match.params.question_id;
    }
    
    render(){
        
        if( !this.state.shouldUpdate )
            return <Loading />
        
        let comments = [];
        
        if( !this.props.comment.data )
            for(let i=0; i<this.props.comment.length; i++){
                comments.push(
                    this.props.comment[i].map(comment => {
                        const userComment = this.props.user[comment.attributes['user-id']-1].attributes;
                        return(
                            <div key={comment.id} className="media p-3 container-form-comment my-1"> 
                                <img src={/*userComment.photo*/'https://source.unsplash.com/random/75x75?sig=' + this.props.user[comment.attributes['user-id']-1].id} alt={userComment.name} className="mr-3 mt-3 rounded-circle" />
                                <div className="media-body">
                                    <h4>{userComment.usern}      
                                        <small><i className='mx-3'>{comment.attributes.date}</i></small>
                                    </h4>
                                    
                                    <Show_text value={comment.attributes.description}/>
                                </div>
                            </div>
                        );
                    })
                );
            }
        
        
        let answers = [];
        const {Comment} = this.state;
        if( !this.props.answer.data )
            answers = this.props.answer.map((answer,i) => {
                
                let userAnswer = {};
                if( this.props.user && !this.props.user.data ){
                    userAnswer = this.props.user[answer.attributes['user-id']-1].attributes;
                    
                    return(
                        <div key={answer.id} className="media p-3 container-form-2"> 
                            <img src={/*userAnswer.photo*/'https://source.unsplash.com/random/150x150?sig=' + this.props.user[answer.attributes['user-id']-1].id} alt={userAnswer.name} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{userAnswer.usern}      
                                    <small><i className='mx-3'>{answer.attributes.date}</i></small>
                                </h4>
                                <Show_text value={answer.attributes.description} />
                                <div className="row txt-r">
                                    <p className="pr-2">Qualification: {answer.attributes.qualification}</p>
                                    <input type="image" alt="Thumb up" src={Thumb_up} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickUp} />
                                    <input type="image" alt="Thumb down" src={Thumb_down} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickDown} />
                                </div>
                                <form onSubmit={this.handleSubmitComment}>
                                    <Rich_text_editor handleTextEditorChange={this.handleCommentChange}/>  
                                    { Comment.submitted && this.state.commentError && <div>{this.state.commentError}</div> }
                                    <input type="hidden" id="_answer_id" name="_answer_id" value={answer.id} /*ASi pasamos el id*/ />
                                    <div className="txt-r mb-3">
                                        <input type="submit" className="btn btn-success active" value="Submit comment!" />
                                    </div>
                                </form>
                                {comments[answer.id-1]}
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
            this.state.shouldUpdate &&
            <div>
                
                <Navbar />
                
                <div className="container">
                
                    <div className="px-5 mx-5">
                        <h2 className="text-center my-5">{(question.data.attributes ? question.data.attributes.title : '')}</h2>
                        
                        <div className="media p-3 container-form-comment mb-1 mt-1"> 
                            <img src={(this.props.user[userQuestionId] ? /*this.props.user[userQuestionId].attributes.photo*/'https://source.unsplash.com/random/150x150' : '')} alt={(this.props.user[userQuestionId] ? this.props.user[userQuestionId].attributes.name : '')} className="mr-3 mt-3 rounded-circle" />
                            <div className="media-body">
                                <h4>{(this.props.user[userQuestionId] ? this.props.user[userQuestionId].attributes.usern : '')}      
                                    <small><i className='mx-3'>{(question.data.attributes ? question.data.attributes.date : '')}</i></small>
                                </h4>
                                
                                <Show_text value={question.data.attributes.description} />
                            </div>
                        </div>
                        
                        <h4 className="text-center my-5">...Answers...</h4>
                        {answers}
                        <form onSubmit={this.handleSubmitAnswer} className="p-4 container-form-2">
                            <div className="form-group shadow-textarea">
                                <label htmlFor="_answer">New answer</label>
                                <Rich_text_editor handleTextEditorChange={this.handleAnswerChange}/>
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