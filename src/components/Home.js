import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import subjectActions from '../_actions/actions-subject';

class Home extends Component {
  
  componentDidMount(){
    this.props.dispatch( subjectActions.getAll() );
  }
  
  render() {
    
    let subjects = [];
    
    if( !this.props.subject.data )
      subjects = this.props.subject.map((subject, i) => {
        const sub = subject.attributes;
        return (
          <Card key={i} title={sub.name} description={"The subject has " + sub['number-of-topics'] + " topics"} route={"/topics/" + subject.id} />
        );
      });
    
    return (
        <div>
          <Navbar />
          <div className="mb-5">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h1 className="text-center my-5">Subjects</h1>
              </div>
              <div className="container">
                <div className="panel-body row">
                
                  {subjects}
                  <Card title="New Subject" description="Add a new subject" route="/new_subject"/>
                  
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
