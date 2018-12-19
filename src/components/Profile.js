import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import userActions from '../_actions/actions-user';
import questionActions from '../_actions/actions-question';
import commentActions from '../_actions/actions-comment';
import answerActions from '../_actions/actions-answer';
import isActualUser from '../_helpers/Is-actual-user';

import Statistics from './Statistics';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading.js';
import ShowText from './ShowText.js';
import DeleteItem from './DeleteItem.js';

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
        this.uploadWidget = this.uploadWidget.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    
    async componentDidMount(){
        const { dispatch } = this.props;
        const { username } = this.props.match.params;
        
        await dispatch( userActions.getUserByUsername( username ) );
        this.setState({
            isUserLogged: isActualUser( this.props.user.id )
        });
        await dispatch( questionActions.getAllByForeanId( this.props.user.id, 'user' ) );
        await dispatch( answerActions.getAllByForeanId( this.props.user.id, 'user' ) );
        await dispatch( commentActions.getAllByForeanId( this.props.user.id, 'user' ) );

        await this.setState( {isDataLoaded: true} );

        console.log( this.props.user );
    }

    uploadWidget() {

        const { dispatch, user } = this.props;
        const { username } = this.props.match.params;
        const _this = this;

        window.cloudinary.setAPIKey('541149863476823');
        window.cloudinary.openUploadWidget({ 
            cloud_name: 'dvuxpp54w', 
            upload_preset: 'ungrupo',
            sources: [
                'local',
                'url',
                'camera',
                'image_search',
                'facebook',
                'dropbox',
                'instagram'
            ],
            googleApiKey: '<image_search_google_api_key>',
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: 'local',
            styles: {
                palette: {
                    window: '#FFFFFF',
                    windowBorder: '#90A0B3',
                    tabIcon: '#0078FF',
                    menuIcons: '#5A616A',
                    textDark: '#000000',
                    textLight: '#FFFFFF',
                    link: '#0078FF',
                    action: '#D84C00',
                    inactiveTabIcon: '#0E2F5A',
                    error: '#F44235',
                    inProgress: '#0078FF',
                    complete: '#20B832',
                    sourceBg: '#E4EBF1'
                },
                fonts: {
                    default: {
                        active: true
                    }
                }
            },
            folder: 'Ungrupo'},

            async function(error, result) {
                
                const data = {
                    photo: result.public_id,
                };

                _this.setState( {isDataLoaded: false} );

                await dispatch( userActions.update( user.id, data ) );

                await dispatch( userActions.getUserByUsername( username ) );

                _this.setState( {isDataLoaded: true} );
        });
    }
    
    updatePhoto(e){
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        var form = new FormData();
        form.append('file', this.state.file);
    }

    deleteUser(){

        const { dispatch, user } = this.props;

        dispatch( userActions.delete( user.id ) );

        //window.location.replace('/');

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
        const attribUser = infoUser.map(attribute => {
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
        
        const { question, answer, comment } = this.props;
        
        let activityQuestion = question.map( (question_i, i) => {
            return(
                <div key={i}>
                    <a href='#' className='no-decoration'>
                        <p className='mx-5'>Title: {question_i.attributes.title}</p>
                        <div className='mx-5'>
                            <ShowText value={question_i.attributes.description}/>
                        </div>
                    </a>
                    <hr />
                </div>
            );
        });
        
        
        let activityAnswer = answer.map( (answer_i, i) => {
            return(
                <div key={i}>
                    <a href='#' className='no-decoration'>
                        <div className='mx-5'>
                            <ShowText value={answer_i.attributes.description}/>
                        </div>
                    </a>
                    <hr />
                </div>
            );
        });
        
        let activityComment = comment.map( (comment_i, i) => {
            return(
                <div key={i}>
                    <a href='#' className='no-decoration'>
                        <div className='mx-5'>
                            <ShowText value={comment_i.attributes.description}/>
                        </div>
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
                                                    <button defaultValue='Change' className={'btn btn-secondary btn-block' + hide} id='btnChangePicture' onClick={this.uploadWidget}>Update</button>
                                                    {/*<input type='button' className={'btn btn-secondary btn-block' + hide} id='btnChangePicture' value='Change' onClick={()=>{this.upload.click()}}/>*/}
                                                    {/*<input type='file' className='d-none' id='profilePicture' name='file' onChange={this.updatePhoto} ref={(ref) => this.upload = ref}/>*/}
                                                </div>
                                            </div>
                                            <div className='ml-3 mt-5'>
                                                <h1 className='d-block'>{this.props.user.attributes.usern}</h1>
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
                                                    <Link className={'nav-link' + (this.state.activeTab === 'basicInfo-tab' ? ' active' : '')} id='basicInfo-tab' name='basicInfo-tab' to="#basicInfo" replace >Basic Info</Link>
                                                </li>
                                                <li className='nav-item' id='stadistics-tab' name='stadistics-tab' onClick={() => {this.changeTab('stadistics-tab');}}>
                                                    <Link className={'nav-link' + (this.state.activeTab === 'stadistics-tab' ? ' active' : '')} id='stadistics-tab' name='stadistics-tab' to="#stadistics" replace >Stadistics</Link>
                                                </li>
                                                <li className='nav-item' id='activity-tab' name='activity-tab' onClick={() => {this.changeTab('activity-tab');}}>
                                                    <Link className={'nav-link' + (this.state.activeTab === 'activity-tab' ? ' active' : '')} id='activity-tab' name='activity-tab' to="#activity" replace >Activity</Link>
                                                </li>
                                                <li className={'nav-item'} id='documents-tab' name='documents-tab' onClick={() => {this.changeTab('documents-tab');}}>
                                                    <Link className={'nav-link' + (this.state.activeTab === 'documents-tab' ? ' active' : '')} id='documents-tab' name='documents-tab' to="#documents" replace >Documents</Link>
                                                </li>
                                            </ul>
                                            <div className='tab-content ml-1' id='myTabContent'>
                                                <div className={'tab-pane fade' + (this.state.activeTab === 'basicInfo-tab' ? ' show active' : '')} id='basicInfo-tab'>
                                                    {attribUser}
                                                    <div className='row d-flex justify-content-between mx-2'>
                                                        <a href='/my_profile/update'><button className={'btn btn-primary' + hide}>Update Profile</button></a>
                                                        <DeleteItem 
                                                            textModal='Are you sure you want to delete your account?' 
                                                            titleModal={'Delete ' + this.props.user.attributes.usern} 
                                                            item={<button className={'btn btn-danger ' + hide}>Delete Profile</button>} 
                                                            deleteFunction={this.deleteUser} 
                                                        />
                                                    </div>
                                                </div>
                                                <div className={'tab-pane fade' + (this.state.activeTab === 'stadistics-tab' ? ' show active' : '')} id='stadistics-tab'>
                                                   <Statistics />
                                                </div>
                                                <div className={'px-5 mx-5 tab-pane fade' + (this.state.activeTab === 'activity-tab' ? ' show active' : '')} id='activity-tab'>
                                                    <div className='border-solid-activity my-2'>
                                                        <div className='mt-2'>
                                                            <h2 className='text-center'>Questions</h2>
                                                            <hr />
                                                            {activityQuestion}
                                                        </div>
                                                    </div>
                                                    <div className='border-solid-activity my-2'>
                                                        <div className='mt-2'>
                                                            <h2 className='text-center'>Answers</h2>
                                                            <hr />
                                                            {activityAnswer}
                                                        </div>
                                                    </div>
                                                    <div className='border-solid-activity my-2'>
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