import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import Loading from './Loading.js';

import subjectActions from '../_actions/actions-subject';

import '../styles/Titles.css';

class Home extends Component {
  
  constructor(props){
    super(props); 

    this.state = {
      isDataLoaded: false
    };
  }

  async componentDidMount(){
    await this.props.dispatch( subjectActions.getAll() );

    await this.setState( {isDataLoaded: true} );
  }
  
  render() {
    
    if( !this.state.isDataLoaded )
      return <Loading />;

    const subjects = this.props.subject.map((subject, i) => {
      const attribSubject = subject.attributes;
      return (
        <Card key={i} title={attribSubject.name} route={'/topics/' + subject.id} />
      );
    });
    
    return (
        <div>
          <Navbar />

          <div className='mb-5'>
            <div className='panel panel-info'>
              <div className='panel-heading'>
                <h1 className='my-5 title-primary'>SUBJECTS</h1>
              </div>
              <div className='container'>
                <div className='panel-body row'>
                
                  {subjects}
                  <Card title='New Subject' description='Add a new subject' route='/new_subject'/>
                  
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
  const { subject } = state;
  return {
    subject
  };
}

export default connect(mapStateToProps)(Home);
