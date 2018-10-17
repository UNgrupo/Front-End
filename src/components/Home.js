import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';
import api_route from '../route';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      subjects: []
    };
  }
  
  componentDidMount(){
    axios.get(api_route + 'subjects')
    .then((response) => {
      this.setState({
        subjects: response.data.data
      });
    });
  }
  
  render() {
    
    const subjects = this.state.subjects.map((subject, i) => {
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
                
                  {subjects} {/* Tarjetas on todas las materias de la base de datos */}
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

export default Home;
