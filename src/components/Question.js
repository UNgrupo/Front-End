import React, {Component} from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import RichTextEditor from './RichTextEditor.js';
import ShowText from './ShowText.js';
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
            isDataLoaded: false
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
          
        this.setState( {isDataLoaded: true} );
    }
    
    async handleClick(answer, number){ 

        const ans = answer.target.value.split(',');
        const data = {
            qualification: parseInt(ans[1], 10) + number
        };
        
        const {dispatch} = this.props;
        await dispatch( answerActions.update( ans[0], data) );

        const {question_id} = this.props.match.params;
        await dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );

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
            user_id: JSON.parse(window.localStorage.getItem('user')).id,
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

        await this.setState( {isDataLoaded: false} );

        const data = {
            description: JSON.stringify(this.state.Answer.answer),
            qualification: 0,
            date: (new Date()).toUTCString(),
            user_id: JSON.parse(window.localStorage.getItem('user')).id,
            question_id: this.props.match.params.question_id
        };
        
        await this.props.dispatch( answerActions.addNew( data ) );
        
        const {question_id} = this.props.match.params;
        await this.props.dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );

        await this.setState({
            Answer: { submitted: true }
        });

        await this.setState( {isDataLoaded: true} );
    }
    
    render(){

        if( !this.state.isDataLoaded )
            return <Loading />
        
        const propsComment = this.props.comment;
        let comments = [];
        for(let i=0; i<propsComment.length; i++){
            comments.push(
                propsComment[i].map(comment => {
                    const userComment = this.props.user[comment.attributes['user-id']-1].attributes;
                    return(
                        <div key={comment.id}>
                            <div className="media px-3 pt-2"> 
                                <a href={'/' + userComment.usern} className='no-decoration-a'>
                                    <img src={/*userComment.photo*/'https://source.unsplash.com/random/75x75?sig=' + this.props.user[comment.attributes['user-id']-1].id} alt={userComment.name} className="mr-3 mt-3 rounded-circle" />
                                </a>
                                <div className="media-body">
                                    <h4>
                                        <a href={'/' + userComment.usern} className='no-decoration-a'>{userComment.usern}</a>
                                        <small><i className='mx-3'>{comment.attributes.date}</i></small>
                                    </h4>
                                    
                                    <ShowText value={comment.attributes.description}/>
                                </div>
                            </div>
                            <hr />
                        </div>

                    );
                })
            );
        }
        
        const {Comment} = this.state;
        const answers = this.props.answer.map((answer,i) => {
            
            const userAnswer = this.props.user[answer.attributes['user-id']-1].attributes;
            return(
                <div key={answer.id}>
                    <div className="media p-3 "> 
                        <a href={ "/" + userAnswer.usern } className="no-decoration-a">
                            <img src={'https://source.unsplash.com/random/150x150?sig=' + this.props.user[answer.attributes['user-id']-1].id} alt={userAnswer.name} className="mr-3 mt-3 rounded-circle" />
                        </a>
                        <div className="media-body">
                            <h4>
                                <a href={ "/" + userAnswer.usern } className="no-decoration-a">{userAnswer.usern}</a>
                                <small><i className='mx-3'>{answer.attributes.date}</i></small>
                            </h4>

                            <ShowText value={answer.attributes.description} />

                            <div className="row txt-r">
                                <p className="pr-2">Qualification: {answer.attributes.qualification}</p>
                                <input type="image" alt="Thumb up" src={Thumb_up} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickUp} />
                                <input type="image" alt="Thumb down" src={Thumb_down} className="image-like" value={[answer.id, answer.attributes.qualification]} onClick={this.handleClickDown} />
                            </div>

                            <RichTextEditor handleTextEditorChange={this.handleCommentChange}/>  

                            <form onSubmit={this.handleSubmitComment}>
                                { Comment.submitted && this.state.commentError && <div>{this.state.commentError}</div> }
                                <input type="hidden" id="_answer_id" name="_answer_id" value={answer.id} /*ASi pasamos el id*/ />
                                <div className="txt-r mb-3">
                                    <input type="submit" className="btn btn-success active" value="Submit comment!" />
                                </div>
                            </form>
                            <div className='container-form-comment'>
                                {comments[answer.id-1]}
                            </div>
                        </div>
                    </div>
                <hr />
                </div>
            );
        
        });
        
        const { question } = this.props;
        let userQuestionId = this.props.question.data.attributes['user-id'];
        
        return(
            <div>
                
                <Navbar />
                
                <div className="container">
                
                    <div className="px-5 mx-5">
                        <h2 className="text-center my-5">{question.data.attributes.title}</h2>
                        
                        <div className="media p-3 container-form-comment mb-1 mt-1">
                            <a href={ "/" + this.props.user[userQuestionId].attributes.usern } className="no-decoration-a">
                                <img src={(this.props.user[userQuestionId] ? /*this.props.user[userQuestionId].attributes.photo*/'https://source.unsplash.com/random/150x150' : '')} alt={this.props.user[userQuestionId].attributes.name} className="mr-3 mt-3 rounded-circle" />
                            </a>
                            <div className="media-body">
                                <h4>
                                    <a href={ "/" + this.props.user[userQuestionId].attributes.usern } className="no-decoration-a">
                                        {this.props.user[userQuestionId].attributes.usern}      
                                    </a>
                                    <small><i className='mx-3'>{question.data.attributes.date}</i></small>
                                </h4>
                                
                                <ShowText value={question.data.attributes.description} />
                            </div>
                        </div>
                        
                        <h4 className="text-center my-5">...Answers...</h4>
                        <div className='container-form-2'>
                            {answers}
                        </div>
                        <div className="p-4 container-form-2">
                            <label htmlFor="_answer">New answer</label>

                            <RichTextEditor handleTextEditorChange={this.handleAnswerChange}/>

                            <form onSubmit={this.handleSubmitAnswer}>
                                <div className="txt-r">
                                    <input type="submit" className="btn btn-success active" value="Submit Answer!" />
                                </div>
                            </form>
                        </div>
                        
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