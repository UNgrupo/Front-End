import React, {Component} from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import topicActions from '../_actions/actions-topic';
import subjectActions from '../_actions/actions-subject';

class Topic extends Component{
    
    async componentDidMount(){
        
        const { subject_id } = this.props.match.params;
        
        await this.props.dispatch( topicActions.getAllByForeanId( subject_id, 'subject' ) );
        
        await this.props.dispatch( subjectActions.getById( subject_id ) );
    }
    
    render(){
        let topics = [];
        
        if( !this.props.topic.data )
        topics = this.props.topic.map((topic, i) => {
            return(
                <Card key={i} title={topic.attributes.name} description={topic.attributes.description} route={"/questions/" + topic.id} />
            );
        });
        
        return(
            <div>
                
                <Navbar />
                
                <div className="panel mb-5">
                    <div className="panel-heading text-center my-5">
                        <h1>Topics of {(this.props.subject.attributes ? this.props.subject.attributes.name : '')}</h1>
                    </div>
                    <div className="container">
                        <div className="panel-body row">
                        
                            {topics}
                            <Card title="New topic" description={"Add a new topic to " + (this.props.subject.attributes ? this.props.subject.attributes.name : '')} route={"/new_topic/" + this.props.match.params.subject_id} />
                            
                        </div>
                    </div>
                </div>
                
                <Footer />
            
            </div>
        );
    }
    
}

function mapStateToProps( state ){
    const { topic, subject } = state;
    return {
        topic,
        subject
    };
}

export default connect(mapStateToProps)(Topic);