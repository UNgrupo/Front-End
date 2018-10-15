import React, {Component} from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';

class Topic extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            subject: 0
        }
    }
    
    componentDidMount(){
        
        const { subject_id } = this.props.match.params;
          
          axios.get("https://back-end-project-caenietoba.c9users.io/topics")
          .then(response => {
              
                  let topics_subject = [];
                  for(let i=0; i<response.data.length; i++)
                    if (response.data[i].subject_id == subject_id)
                        topics_subject.push( response.data[i] );
                  
                this.setState({
                  topics: topics_subject
                });
          });
          
          axios.get("https://back-end-project-caenietoba.c9users.io/subjects/"+subject_id)
          .then(response => {
              this.setState({
                  subject: response.data
              });
          });
    }
    
    render(){
        
        const topics = this.state.topics.map((topic, i) => {
            return(
                <Card key={i} title={topic.name} description={topic.description} route={"/questions/" + topic.id} />
            );
        });
        
        return(
            <div>
                
                <Navbar />
                
                <div className="panel mb-5">
                    <div className="panel-heading text-center my-5">
                        <h1>Topics of {this.state.subject.name}</h1>
                    </div>
                    <div className="container">
                        <div className="panel-body row">
                        
                            {topics}
                            <Card title="New topic" description={"Add a new topic to " + this.state.subject.name} route={"/new_topic/" + this.props.match.params.subject_id} />
                            
                        </div>
                    </div>
                </div>
                
                <Footer />
            
            </div>
        );
    }
    
}

export default Topic;