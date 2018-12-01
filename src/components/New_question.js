import React, { Component } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer.js';
import Navbar from './Navbar.js';
import RichTextEditor from './RichTextEditor.js';

import questionActions from '../_actions/actions-question';

import '../styles/Titles.css';
import '../styles/Form.css';

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
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }
  
  async handleSubmit(e){
    
    e.preventDefault();
    
    const title = e.target.elements.title.value;
    const description = JSON.stringify(this.state.description);
    
    const data = { 
      title,
      description,
      date: (new Date()).toUTCString(),
      user_id: JSON.parse(window.localStorage.getItem('user')).id,
      topic_id: this.props.match.params.topic_id
    };
    
    this.setState({
      submitted: true
    });
    
    if( title && description )
      await this.props.dispatch( questionActions.addNew( data ) );
  }

  handleQuestionChange(text){
    this.setState( {description: text} );
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
      window.location.href = '/questions/' + this.props.match.params.topic_id;
    }
    
    const { title, description, submitted } = this.state;
    const { success, data } = this.props.question;
    
    let titleError = '', descriptionError = '';
    if( !success && data && data.data ){
      titleError = data.data.title;
      descriptionError = data.data.description;
    }
    
    return ( //Falta cambiar la parte de agregar el TextRichArea a poder agregar una pregunta
        <div>
                
          <Navbar />
          
          <div className='panel py-5 my-5 container'>
            <div className='form-container form-container-margin'>

              <h1 className='title-form text-center my-3 panel-heading'>New Question </h1>
              
              <div className='panel-body px-5'>
                <form onSubmit={ this.handleSubmit } className='pt-3'>
                  { submitted && success && <div className='help-block text-center text-success'><big>{ data.toString() }</big></div> }
                  <div className={'form-group' + ( submitted && (!title || titleError) ? ' has-error': '')}>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' className='form-control' id='title' name='title' value={title} onChange={this.handleChange}/>
                    { submitted && !title && <div className='help-block'><small>Title is required</small></div>}
                    { submitted && titleError && <div className='help-block'><small>{ titleError }</small></div>}
                  </div>
                  <div className={'form-group' + ( submitted && (!description || descriptionError) ? ' has-error': '')}>
                    <label htmlFor='description'>Description:</label>
                    <RichTextEditor handleTextEditorChange={this.handleQuestionChange}/>  
                    { submitted && !description && <div className='help-block'><small>Description is required</small></div>}
                    { submitted && descriptionError && <div className='help-block'><small>{ titleError }</small></div>}
                  </div>
                  <div className='row pt-3 mb-5'>
                    <div className='col'>
                      <input type='submit' className='btn btn-success btn-block active' value='Add me!' />
                    </div>
                    <div className='col'>
                      <a href={'/questions/'+this.props.match.params.topic_id}>
                        <input className='btn btn-danger btn-block active' defaultValue='Go back!' />
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <Footer />
          
      </div>
    );
  }
}

function mapStateToProps( state ){
  const { question } = state;
  return {
    question
  };
}

export default connect(mapStateToProps)(New_question);
