import React, {Component} from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import Loading from './Loading.js';
import Pagination from './Pagination.js';

import topicActions from '../_actions/actions-topic';
import subjectActions from '../_actions/actions-subject';
import paginationActions from '../_actions/actions-pagination';

import '../styles/Titles.css';

class Topic extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            isDataLoaded: false,
            actualUser: JSON.parse(window.localStorage.getItem('user'))
        };
    }

    async componentDidMount(){
        
        const { subject_id } = this.props.match.params;
        
        await this.props.dispatch( topicActions.getAllByForeanId( subject_id, 'subject' ) );
        
        await this.props.dispatch( subjectActions.getById( subject_id ) );

        await this.props.dispatch( paginationActions.setPage( this.props.topic ) );

        await this.setState( {isDataLoaded: true} );
    }
    
    render(){

        if( !this.state.isDataLoaded )
            return <Loading />

        const topics = this.props.pagination.map((topic, i) => {
            const { actualUser } = this.state;
            return(
                <Card key={i} id={topic.id} title={topic.attributes.name} route={'/questions/' + topic.id} user={actualUser} type='topic' canBeDeleted={true}/>
            );
        });
        
        return(
            <div>
                
                <Navbar />
                
                <div className='panel mb-5'>
                    <div className='panel-heading my-5'>
                        <h1 className='title-primary'>Topics of {this.props.subject.attributes.name}</h1>
                    </div>
                    <div className='container'>
                        <div className='panel-body row'>
                        
                            {topics}
                            <Card title='New topic' route={'/new_topic/' + this.props.match.params.subject_id} />
                            
                        </div>
                        <Pagination data={this.props.topic}/>
                    </div>
                </div>
                
                <Footer />
            
            </div>
        );
    }
    
}

function mapStateToProps( state ){
    const { topic, subject, pagination } = state;
    return {
        topic,
        subject,
        pagination
    };
}

export default connect(mapStateToProps)(Topic);