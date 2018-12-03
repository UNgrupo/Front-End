import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Loading from './Loading.js';

import questionActions from '../_actions/actions-question';
import userActions from '../_actions/actions-user';

import '../styles/Questions.css';
import '../styles/Titles.css';

class Questions extends Component {

  constructor(props){
      super(props);

      this.state = {
        isDataLoaded: false, 
        user: JSON.parse(window.localStorage.getItem('user'))
      };
      
      this.deleteQuestion = this.deleteQuestion.bind(this);
      this.isActualUser = this.isActualUser.bind(this);
  }
  
  async componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    await this.props.dispatch( questionActions.getAllByForeanId( topic_id, 'topic' ) );
    
    await this.props.dispatch( userActions.getAll() );

    await this.setState( {isDataLoaded: true} );
  }
  
  async deleteQuestion(id){
    
    await this.setState( {isDataLoaded: false} );
    
    await this.props.dispatch( questionActions.delete( id ) );
    
    const {topic_id} = this.props.match.params;
    await this.props.dispatch( questionActions.getAllByForeanId( topic_id, 'topic' ) );
    
    await this.setState( {isDataLoaded: true} );
  }
  
  isActualUser(question){
      
    const trashIcon = <span className='d-flex justify-content-end clickable' onClick={() => {this.deleteQuestion(question.id)}}>
                        <i className="fas fa-trash-alt"></i>
                      </span>
    
    return (parseInt(this.state.user.id,10) === parseInt(question.attributes['user-id'],10) ? trashIcon : '');
  }
  
  render() {

    if( !this.state.isDataLoaded )
      return <Loading />;
    
    const questions = this.props.question.map((question, i) => {
      
      const username = this.props.user[question.attributes['user-id']-1].attributes.usern;
      
      return (
        
        <div key={i} className='panel'>
          <div className='panel-body px-5 mx-5 py-2'>
            <div className='row'>
              <a href={'/questions/' + this.props.match.params.topic_id + '/' + question.id} className='no-decoration-a'>
                <h4>{question.attributes.title}</h4>
              </a>
              <i className='far fa-question-circle ml-3' />
            </div>
            <div className='row mx-2'>
              <a href={'/' + username} className='mr-2'>
                <img src={'https://source.unsplash.com/random/30x30?sig=' + this.props.user[question.attributes['user-id']-1].id} alt={username} className='rounded-circle' />
              </a>
              <a href={'/' + username} className='mr-2 mt-1'>{username}</a>
              <div className='mt-1'>{question.attributes.date}</div>
            </div>
            
            {this.isActualUser(question)}
          </div>
          <hr />
        </div>
      );
    });
    
    return (
      <div>
        <Navbar />
        
        <div className='content'>
          <h1 className='my-5 title-primary'>Questions</h1>
          <div className='margin-questions border-panel'>
            <div className='panel px-5 py-3 my-2'>
              <div className='row panel-body px-5 py-3'>
                <a href={'/questions/new_question/' + this.props.match.params.topic_id} className='no-decoration-a'>
                  <h3>Add a new question</h3>
                </a>
                <span className='ml-3'>
                  <a href={'/questions/new_question/' + this.props.match.params.topic_id} className='no-decoration-a'><i className='fas fa-plus-square' /></a>
                </span>
              </div>
            </div>
            <hr />
            {questions}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
}

function mapStateToProps( state ){
  const { question, user } = state;
  return {
    question, 
    user
  };
}

export default connect(mapStateToProps)(Questions);