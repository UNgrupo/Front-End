import React, {Component} from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import api_route from '../route';

class Topic extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            subject: {attributes: {name: ""}}
        };
    }
    
    componentDidMount(){
        
        const { subject_id } = this.props.match.params;
        
        axios.get(api_route + "topics")
        .then(response => {
            const resTopics = response.data.data;
            let topics_subject = [];
            for(let i=0; i<resTopics.length; i++)
                if (resTopics[i].attributes['subject-id'] == subject_id)
                    topics_subject.push( resTopics[i] );
              
            this.setState({
                topics: topics_subject
            });
        });
        
        axios.get(api_route + "subjects/" + subject_id)
        .then(response => {
            this.setState({
                subject: response.data.data
            });
        })
        .catch(error => {
            alert(error.message);
        });
    }
    
    render(){
        
        const topics = this.state.topics.map((topic, i) => {
            return(
                <Card key={i} title={topic.attributes.name} description={topic.attributes.description} route={"/questions/" + topic.id} />
            );
        });
        
        return(
            <div>
                
                <Navbar />
                
                <div className="panel mb-5">
                    <div className="panel-heading text-center my-5">
                        <h1>Topics of {this.state.subject.attributes.name}</h1>
                    </div>
                    <div className="container">
                        <div className="panel-body row">
                        
                            {topics}
                            <Card title="New topic" description={"Add a new topic to " + this.state.subject.attributes.name} route={"/new_topic/" + this.props.match.params.subject_id} />
                            
                        </div>
                    </div>
                </div>
                
                <Footer />
            
            </div>
        );
    }
    
}

export default Topic;