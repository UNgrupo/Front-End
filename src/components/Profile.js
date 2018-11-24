import React, { Component } from 'react';
import { connect } from 'react-redux';

import userActions from '../_actions/actions-user';
import questionActions from '../_actions/actions-question';
import commentActions from '../_actions/actions-comment';
import answerActions from '../_actions/actions-answer';
import isActualUser from '../_helpers/Is-actual-user';

import Statistics from './Statistics';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loading from './Loading.js';

import '../styles/Profile.css';

//Una manera de hacer el id del usuario actual inmutable seria implementar un singleton el cual si ya hay asignado un id entonces este no se pueda cambiar hasta que sea indefinido

class Profile extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            activeTab: 'basicInfo-tab',
            isUserLogged: false,
            isDataLoaded: false
        };
        
        this.changeTab = this.changeTab.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
        this.inputOpenFileRef = React.createRef();
    }
    
    async componentDidMount(){
        const { dispatch } = this.props;
        const { username } = this.props.match.params;
        //const userId = window.localStorage.getItem( 'user-id' );
        
        await dispatch( userActions.getUserByUsername( username ) );
        this.setState({
            //isUserLogged: ( this.props.user.id === userId ),
            isUserLogged: isActualUser( this.props.user.id )
        });
        await dispatch( questionActions.getAllByForeanId( this.props.user.id, 'user' ) );
        await dispatch( answerActions.getAllByForeanId( this.props.user.id, 'user' ) );
        await dispatch( commentActions.getAllByForeanId( this.props.user.id, 'user' ) );

        this.setState( {isDataLoaded: true} );
    }
    
    updatePhoto(e){
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        var form = new FormData();
        form.append('file', this.state.file);
    }
    
    changeTab(navItem){
        this.setState({
            activeTab: navItem
        });
    }
  
  render() {

    if( !this.state.isDataLoaded )
        return <Loading />
      
      const infoUser = [['usern', 'Username'], ['name', 'Full name'], ['email', 'Email'], ['role', 'Role'], ['reputation', 'Reputation'], ['level', 'Level']];
      let attribUser;
      if( this.props.user.attributes ){
        attribUser = infoUser.map(attribute => {
            return (
                <div key={attribute}>
                    <div className = 'row'>
                        <div className = 'col-sm-3 col-md-3 col-5'>
                            <label>{attribute[1]}</label>
                        </div>
                        <div className='col-md-8 col-6'>
                            {this.props.user.attributes[attribute[0]]}
                        </div>
                    </div>
                    <hr />
                </div>
            );
        });
      }
      
      let { question, answer, comment } = this.props;
      if( this.props.user.attributes ){
           question = this.props.question;
           answer = this.props.answer;
           comment = this.props.comment;
      }
      
      let activityQuestion = Object;
      if( !question.data )
          activityQuestion = question.map( (question_i, i) => {
                return(
                    <div key={i}>
                        <a href='#' className='no-decoration'>
                            <p className='mx-5'>Title: {question_i.attributes.title}</p>
                            <p className='mx-5'>Question: {question_i.attributes.description}</p>
                        </a>
                        <hr />
                    </div>
                );
          });
      
      
      let activityAnswer = Object;
      if( !answer.data )
          activityAnswer = answer.map( (answer_i, i) => {
                return(
                    <div key={i}>
                        <a href='#' className='no-decoration'>
                            <p className='mx-5'>Answer: {answer_i.attributes.description}</p>
                        </a>
                        <hr />
                    </div>
                );
          });
      
      let activityComment = Object;
      if( !comment.data )
          activityComment = comment.map( (comment_i, i) => {
                return(
                    <div key={i}>
                        <a href='#' className='no-decoration'>
                            <p className='mx-5'>Comment: {comment_i.attributes.description}</p>
                        </a>
                        <hr />
                    </div>
                );
          });
          
      const hide = ( !this.state.isUserLogged ? ' d-none' : '');
      
    return (
        <div>
        
            <Navbar />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card p-5 m-5'>
                            <div className='card-body'>
                                <div className='card-title mb-4'>
                                    <div className='d-flex justify-content-start'>
                                        <form >
                                        </form>
                                        <div className='image-container'>
                                            <img src='https://source.unsplash.com/random/150x150' alt='profile' id='imgProfile' className='img-thumbnail' />
                                            <div className='middle'>
                                                <input type='button' className={'btn btn-secondary btn-block' + hide} id='btnChangePicture' value='Change' onClick={()=>{this.upload.click()}}/>
                                                <input type='file' className='d-none' id='profilePicture' name='file' onChange={this.updatePhoto} ref={(ref) => this.upload = ref}/>
                                            </div>
                                        </div>
                                        <div className='userData ml-3 mt-5'>
                                            <h1 className='d-block'>{(this.props.user.attributes) ? this.props.user.attributes.usern : ''}</h1>
                                        </div>
                                        <div className='ml-auto'>
                                            <input type='button' className='btn btn-primary d-none' id='btnDiscard' value='Discard Changes'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <ul className='nav nav-tabs mb-4' id='myTab' role='tablist'>
                                            <li className='nav-item' id='basicInfo-tab' name='basicInfo-tab' onClick={() => {this.changeTab('basicInfo-tab');}}>
                                                <a className={'nav-link' + (this.state.activeTab === 'basicInfo-tab' ? ' active' : '')} id='basicInfo-tab' name='basicInfo-tab' href='#basicInfo'>Basic Info</a>
                                            </li>
                                            <li className='nav-item' id='stadistics-tab' name='stadistics-tab' onClick={() => {this.changeTab('stadistics-tab');}}>
                                                <a className={'nav-link' + (this.state.activeTab === 'stadistics-tab' ? ' active' : '')} id='stadistics-tab' name='stadistics-tab' href='#stadistics'>Stadistics</a>
                                            </li>
                                            <li className='nav-item' id='activity-tab' name='activity-tab' onClick={() => {this.changeTab('activity-tab');}}>
                                                <a className={'nav-link' + (this.state.activeTab === 'activity-tab' ? ' active' : '')} id='activity-tab' name='activity-tab' href='#activity'>Activity</a>
                                            </li>
                                            <li className={'nav-item'} id='documents-tab' name='documents-tab' onClick={() => {this.changeTab('documents-tab');}}>
                                                <a className={'nav-link' + (this.state.activeTab === 'documents-tab' ? ' active' : '')} id='documents-tab' name='documents-tab' href='#documents'>Documents</a>
                                            </li>
                                        </ul>
                                        <div className='tab-content ml-1' id='myTabContent'>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'basicInfo-tab' ? ' show active' : '')} id='basicInfo-tab'>
                                                {attribUser}
                                                <a href='/my_profile/update'><button className={'btn btn-secondary' + hide}>Update Profile</button></a>
                                            </div>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'stadistics-tab' ? ' show active' : '')} id='stadistics-tab'>
                                                { ( this.props.user.attributes ? <Statistics /> : '' ) }
                                            </div>
                                            <div className={'px-5 mx-5 tab-pane fade' + (this.state.activeTab === 'activity-tab' ? ' show active' : '')} id='activity-tab'>
                                                <div className='border-solid my-2'>
                                                    <div className='mt-2'>
                                                        <h2 className='text-center'>Questions</h2>
                                                        <hr />
                                                        {activityQuestion}
                                                    </div>
                                                </div>
                                                <div className='border-solid my-2'>
                                                    <div className='mt-2'>
                                                        <h2 className='text-center'>Answers</h2>
                                                        <hr />
                                                        {activityAnswer}
                                                    </div>
                                                </div>
                                                <div className='border-solid my-2'>
                                                    <div className='mt-2'>
                                                        <h2 className='text-center'>Comments</h2>
                                                        <hr />
                                                        {activityComment}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'documents-tab' ? ' show active' : '')} id='documents-tab'>
                                                <p>There are 0 documents at the moment please upload one</p>
                                                <div className='text-center'><button className={'btn btn-warning' + hide}>Upload document</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
}

function mapStateToProps( state ){
    const {user, question, answer, comment} = state;
    return {
        user,
        question,
        answer,
        comment
    };
}

export default connect(mapStateToProps)(Profile);