import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer.js';
import Navbar from './Navbar.js';
import topicActions from '../_actions/actions-topic';
import questionActions from '../_actions/actions-question';

class New_question extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      submitted: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount(){
    
    const {topic_id} = this.props.match.params;
    
    this.props.dispatch( topicActions.getById( topic_id ) );
  }
  
  async handleSubmit(e){
    
    e.preventDefault();
    
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    
    const data = { 
      title,
      description,
      date: (new Date()).toUTCString(),
      'user_id': window.localStorage.getItem('user-id'),
      'topic_id': this.props.topic.id
    };
    
    this.setState({
      submitted: true
    });
    
    if( title && description )
      await this.props.dispatch( questionActions.addNew( data ) );
  }
  
  handleChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      submitted: false
    });
  }
  
  render() {
    
    if( this.props.question.success && this.state.submitted ){
      window.location.href = "/questions/" + this.props.topic.id;
    }
    
    const { title, description, submitted } = this.state;
    const { success, data } = this.props.question;
    
    let titleError = '', descriptionError = '';
    if( !success && data && data.data ){
      titleError = data.data.title;
      descriptionError = data.data.description;
    }
    
    return (
        <div>
                
          <Navbar />
          
          <div className="panel py-5 my-5 container">
            <div className="container-form-pad ">
              <div className="container-form-2">
                <div className="panel-heading my-3 text-center">
                  <h1 className="title-l">New Question of {(this.props.topic.attributes ? this.props.topic.attributes.name : '')} </h1>
                </div>
                <div className="panel-body px-5">
                  <form onSubmit={ this.handleSubmit } className="pt-3">
                    { submitted && success && <div className='help-block text-center text-success'><big>{ data.toString() }</big></div> }
                    <div className={'form-group' + ( submitted && (!title || titleError) ? ' has-error': '')}>
                      <label htmlFor="title">Title:</label>
                      <input type="text" className="form-control" id="title" name="title" value={title} onChange={this.handleChange}/>
                      { submitted && !title && <div className='help-block'><small>Title is required</small></div>}
                      { submitted && titleError && <div className='help-block'><small>{ titleError }</small></div>}
                    </div>
                    <div className={'form-group' + ( submitted && (!description || descriptionError) ? ' has-error': '')}>
                      <label htmlFor="description">Description:</label>
                      <input type="text" className="form-control" id="description" name="description" value={description} onChange={this.handleChange}/>
                      { submitted && !description && <div className='help-block'><small>Description is required</small></div>}
                      { submitted && descriptionError && <div className='help-block'><small>{ titleError }</small></div>}
                    </div>
                    <div className="row pt-3 mb-5">
                      <div className="col">
                        <input type="submit" className="btn btn-success btn-block active" defaultValue="Add me!" />
                      </div>
                      <div className="col">
                        <a href={"/questions/"+this.props.topic.id}>
                          <input className="btn btn-danger btn-block active" defaultValue="Go back!" />
                        </a>
                      </div>
                    </div>
                  </form>
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
  const { topic, question } = state;
  return {
    topic,
    question
  };
}

export default connect(mapStateToProps)(New_question);
