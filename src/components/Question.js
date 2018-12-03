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
import '../styles/Titles.css';

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
            isDataLoaded: false,
            actualUser: JSON.parse(window.localStorage.getItem('user'))
        };
        
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleClickThumb = this.handleClickThumb.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.canUserDrop = this.canUserDrop.bind(this);
    }
    
    async componentDidMount(){

          const {question_id} = this.props.match.params;
          const {dispatch} = this.props;
          
          await dispatch( questionActions.getById( question_id ) );
          
          await dispatch( userActions.getAll() );
          
          await dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );
          
          await dispatch( commentActions.getAllCommentsOfQuestion() );
          
            await this.setState( {
                isDataLoaded: true
            } );
    }

    async handleClickThumb(answer, number){
        const data = {
            qualification: answer.attributes.qualification + number
        };
        
        const {dispatch} = this.props;
        await dispatch( answerActions.update( answer.id, data) );

        const {question_id} = this.props.match.params;
        await dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );

        /* Cambia los el diccionario de thumbs para saber si el usuario ha seleccionado que le gusta o no una respuesta */
        const actualUser = this.state.actualUser;
        actualUser.thumbs[answer.id] = (actualUser.thumbs[answer.id] !== null ? actualUser.thumbs[answer.id] + number : number);

        window.localStorage.setItem('user', JSON.stringify(actualUser));
        this.setState({actualUser});
        /*  */
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
    
    canUserDrop(elem, type){
      
        const trashIcon = <span className='d-flex justify-content-end clickable' onClick={() => {this.deleteQuestion(elem.id, type)}}>
                            <i className="fas fa-trash-alt"></i>
                          </span>
        
        return (parseInt(this.state.actualUser.id,10) === parseInt(elem.attributes['user-id'],10) ? trashIcon : '');
      }
      
    async deleteQuestion(id, type){
         await this.setState( {isDataLoaded: false} );
         
         if(type === 'answer'){
             
            await this.props.dispatch( answerActions.delete( id ) );
        
            const {question_id} = this.props.match.params;
            await this.props.dispatch( answerActions.getAllByForeanId( question_id, 'question', sortAlgorithms.orderQualificationGreater ) );
             
         } else{
             
            await this.props.dispatch( commentActions.delete( id ) );
        
            await this.props.dispatch( commentActions.getAllCommentsOfQuestion() );
             
         }
        
        await this.setState( {isDataLoaded: true} );
     }
    
    async handleSubmitComment(e){

        e.preventDefault();
        
        const data = {
            description: JSON.stringify(this.state.Comment.comment),
            date: (new Date()).toUTCString(),
            user_id: this.state.actualUser.id,
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
            user_id: this.state.actualUser.id,
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
                propsComment[i] !== undefined ? 
                propsComment[i].map(comment => {
                    const userComment = this.props.user[comment.attributes['user-id']-1].attributes;
                    return(
                        <div key={comment.id}>
                            <div className='media px-3 pt-2'> 
                                <a href={'/' + userComment.usern} className='no-decoration-a'>
                                    <img src={'https://source.unsplash.com/random/75x75?sig=' + this.props.user[comment.attributes['user-id']-1].id} alt={userComment.name} className='mr-3 mt-3 rounded-circle' />
                                </a>
                                <div className='media-body'>
                                    <h4>
                                        <a href={'/' + userComment.usern} className='no-decoration-a'>{userComment.usern}</a>
                                        <small><i className='mx-3'>{comment.attributes.date}</i></small>
                                    </h4>
                                    
                                    <ShowText value={comment.attributes.description}/>
                                </div>
                                {this.canUserDrop(comment, 'comment')}
                            </div>
                            <hr />
                        </div>

                    );
                }) : []
            );
        }

        const {Comment, actualUser} = this.state;
        const answers = this.props.answer.map((answer,i) => {

            const activeThumbUp = (actualUser.thumbs[answer.id] === 1 ? 'opacity': 'clickable');
            const functionThumbUp = (actualUser.thumbs[answer.id] === 1 ? ()=>{}: () => {this.handleClickThumb(answer, 1)});
            const activeThumbDown = (actualUser.thumbs[answer.id] === -1 ? 'opacity': 'clickable');
            const functionThumbDown = (actualUser.thumbs[answer.id] === -1 ? ()=>{}: () => {this.handleClickThumb(answer, -1)});

            const userAnswer = this.props.user[answer.attributes['user-id']-1].attributes;
            return(
                <div key={answer.id}>
                    <div className='media p-3 '> 
                        <a href={ '/' + userAnswer.usern } className='no-decoration-a'>
                            <img src={'https://source.unsplash.com/random/150x150?sig=' + this.props.user[answer.attributes['user-id']-1].id} alt={userAnswer.name} className='mr-3 mt-3 rounded-circle' />
                        </a>
                        <div className='media-body'>
                            <h4>
                                <a href={ '/' + userAnswer.usern } className='no-decoration-a'>{userAnswer.usern}</a>
                                <small><i className='mx-3'>{answer.attributes.date}</i></small>
                            </h4>

                            <ShowText value={answer.attributes.description} />

                            <div className='d-flex justify-content-end'>
                                <p className='pr-2'>Qualification: {answer.attributes.qualification}</p>
                                <span className='fa-stack fa-mg'>
                                    <i className='fa fa-circle fa-stack-2x' />
                                    <i className={'far fa-thumbs-down fa-stack-1x fa-inverse'} />
                                </span>
                                <span className='fa-stack fa-mg'>
                                    <i className='fa fa-circle fa-stack-2x' />
                                    <i className={'far fa-thumbs-up fa-stack-1x fa-inverse'} />
                                </span>
                                <span className='fa-stack fa-mg'>
                                    <i className='fa fa-square fa-stack-2x' />
                                    <i className={'far fa-thumbs-down fa-stack-1x fa-inverse'} />
                                </span>
                                <span className='fa-stack fa-mg'>
                                    <i className='fa fa-square fa-stack-2x' />
                                    <i className={'far fa-thumbs-up fa-stack-1x fa-inverse'} />
                                </span>
                                <span className={'fa-stack fa-mg ' + activeThumbDown} onClick={functionThumbDown}>
                                    <i className='fa fa-circle fa-stack-2x' />
                                    <i className={'fas fa-thumbs-down fa-stack-1x fa-inverse'} />
                                </span>
                                <span className={'fa-stack fa-mg ' + activeThumbUp} onClick={functionThumbUp}>
                                    <i className='fa fa-circle fa-stack-2x' />
                                    <i className={'fas fa-thumbs-up fa-stack-1x fa-inverse'} />
                                </span>
                                <span className={'fa-stack fa-mg ' + activeThumbDown} onClick={functionThumbDown}>
                                    <i className='fa fa-square fa-stack-2x' />
                                    <i className={'fas fa-thumbs-down fa-stack-1x fa-inverse'} />
                                </span>
                                <span className={'fa-stack fa-mg ' + activeThumbUp} onClick={functionThumbUp}>
                                    <i className='fa fa-square fa-stack-2x' />
                                    <i className={'fas fa-thumbs-up fa-stack-1x fa-inverse'} />
                                </span>
                            </div>

                            <RichTextEditor handleTextEditorChange={this.handleCommentChange}/>  

                            <form onSubmit={this.handleSubmitComment}>
                                { Comment.submitted && this.state.commentError && <div>{this.state.commentError}</div> }
                                <input type='hidden' id='_answer_id' name='_answer_id' value={answer.id}/>
                                <div className='mb-3 d-flex justify-content-end'>
                                    <input type='submit' className='btn btn-success active' value='Submit comment!' />
                                </div>
                            </form>
                            <div className='container-form-comment'>
                                {comments[answer.id-1]}
                            </div>
                        </div>
                        {this.canUserDrop(answer, 'answer')}
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
                
                <div className='container'>
                
                    <div className='px-5 mx-5'>
                        <h1 className='my-5 title-question'>{question.data.attributes.title}</h1>
                        
                        <div className='media p-3 container-form-comment mb-1 mt-1'>
                            <a href={ '/' + this.props.user[userQuestionId].attributes.usern } className='no-decoration-a'>
                                <img src={'https://source.unsplash.com/random/150x150?sig=' + this.props.user[userQuestionId].id} alt={this.props.user[userQuestionId].attributes.name} className='mr-3 mt-3 rounded-circle' />
                            </a>
                            <div className='media-body'>
                                <h4>
                                    <a href={ '/' + this.props.user[userQuestionId].attributes.usern } className='no-decoration-a'>
                                        {this.props.user[userQuestionId].attributes.usern}      
                                    </a>
                                    <small><i className='mx-3'>{question.data.attributes.date}</i></small>
                                </h4>
                                
                                <ShowText value={question.data.attributes.description} />
                            </div>
                        </div>
                        
                        <h4 className='my-5 title-question-answers'>Answers</h4>
                        <div className='container-form-comment'>
                            {answers}
                        </div>

                        <div className='p-4 container-form-comment'>
                            <label htmlFor='_answer' className='title-question-new-answers'>New answer</label>

                            <RichTextEditor handleTextEditorChange={this.handleAnswerChange}/>

                            <form onSubmit={this.handleSubmitAnswer}>
                                <div className='d-flex justify-content-end'>
                                    <input type='submit' className='btn btn-success active' value='Submit Answer!' />
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