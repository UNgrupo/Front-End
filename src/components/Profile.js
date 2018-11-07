import React, { Component } from 'react';
import { connect } from 'react-redux';

import userActions from '../_actions/actions-user';

import Statistics from './Statistics';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Profile extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            activeTab: 'basicInfo-tab'
        };
        
        this.changeTab = this.changeTab.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
        this.inputOpenFileRef = React.createRef();
    }
    
    componentDidMount(){
        this.props.dispatch( userActions.getById( window.localStorage.getItem( 'user-id' ) ) );
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
                                            <img src='http://placehold.it/150x150' alt='profile' id='imgProfile' className='img-thumbnail' />
                                            <div className='middle'>
                                                <input type='button' className='btn btn-secondary btn-block' id='btnChangePicture' value='Change' onClick={()=>{this.upload.click()}}/>
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
                                            <li className='nav-item' id='documents-tab' name='documents-tab' onClick={() => {this.changeTab('documents-tab');}}>
                                                <a className={'nav-link' + (this.state.activeTab === 'documents-tab' ? ' active' : '')} id='documents-tab' name='documents-tab' href='#documents'>Documents</a>
                                            </li>
                                        </ul>
                                        <div className='tab-content ml-1' id='myTabContent'>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'basicInfo-tab' ? ' show active' : '')} id='basicInfo-tab'>
                                                {attribUser}
                                            </div>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'stadistics-tab' ? ' show active' : '')} id='stadistics-tab'>
                                                <Statistics user={(this.props.user.attributes ? this.props.user.attributes : Object)} />
                                            </div>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'activity-tab' ? ' show active' : '')} id='activity-tab'>
                                                Hola mundo
                                                sola
                                            </div>
                                            <div className={'tab-pane fade' + (this.state.activeTab === 'documents-tab' ? ' show active' : '')} id='documents-tab'>
                                                Hola mundo
                                                sola
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
    const {user} = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(Profile);