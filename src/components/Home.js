import React, { Component } from 'react';
import axios from 'axios'

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Card from './Card.js';

class Home extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      subjects: [],
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    this.setState({
      redirect: true
    });
  }
  
  componentDidMount(){
    axios.get('https://back-end-project-caenietoba.c9users.io/subjects')
    .then((response) => {
      this.setState({
        subjects: response.data
      });
    });
  }
  
  render() {
    
    const subjects = this.state.subjects.map((subject, i) => {
      return (
        <Card title={subject.name} description={"The subject has " + subject.number_of_topics + " topics"} route={"/topics/" + subject.id} />
      );
    });
    
    return (
        <div>
          <Navbar />
          
          <div className="mb-5">
            <div classname="panel panel-info">
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
