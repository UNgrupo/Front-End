import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import Loading from './Loading.js';
import Pagination from './Pagination.js';

import subjectActions from '../_actions/actions-subject';
import paginationActions from '../_actions/actions-pagination';

import '../styles/Titles.css';

class Home extends Component {
  
  constructor(props){
    super(props); 

    this.state = {
      isDataLoaded: false,
      actualUser: JSON.parse(window.localStorage.getItem('user'))
    };
  }

  async componentDidMount(){
    await this.props.dispatch( subjectActions.getAll() );

    await this.props.dispatch( paginationActions.setPage( this.props.subject ) );

    await this.setState( {isDataLoaded: true} );
  }
  
  render() {
    
    const { isDataLoaded, actualUser } = this.state;

    if( !isDataLoaded )
      return <Loading />;

    const subjects = this.props.pagination.map((subject, i) => {
      const attribSubject = subject.attributes;
      return (
        <Card key={i} id={subject.id} title={attribSubject.name} route={'/topics/' + subject.id} user={actualUser} type='subject' canBeDeleted={true}/>
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
                  <Card title='New Subject' route='/new_subject'/>
                  
                </div>
                <Pagination data={this.props.subject}/>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
    );
  }
}

function mapStateToProps( state ){
  const { subject, pagination } = state;
  return {
    subject,
    pagination
  };
}

export default connect(mapStateToProps)(Home);
