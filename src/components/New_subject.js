import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import subjectActions from '../_actions/actions-subject';

import '../styles/Form.css';
import '../styles/Titles.css';

class New_subject extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            submitted: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    async handleSubmit(e){
        e.preventDefault();
        
        const { name } = this.state;
        
        const data = {
            name: e.target.elements.name.value,
            number_of_topics: 0
        };
        
        this.setState({
            submitted: true
        });
        
        if( name )
            await this.props.dispatch( subjectActions.addNew( data ) );
    }
    
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            submitted: false
        });
    }
    
    render(){
        
        if( this.props.subject.success )
            window.location.href = "/home";
        
        const { submitted, name } = this.state;
        const { success, data } = this.props.subject;
        
        let nameError = '';
        if( !success && data.data )
            nameError = data.data.name;
        
        return(
            <div>
                
                <Navbar />
                
                <div className="panel py-5 my-5 container">
                    <div className="container-form-pad ">
                        <div className="container-form-2">
                            <div className="panel-heading my-3 text-center">
                                <h1 className="title-l">New Subject</h1>
                            </div>
                            <div className="panel-body px-5">
                                <form onSubmit={ this.handleSubmit } className="pt-3">
                                    <div className={ 'form-group' + (submitted && ( !name || nameError) ? ' has-error': '')}>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.handleChange}/>
                                        { submitted && !name && <div className='help-block'><small>Name is required</small></div> }
                                        { submitted && nameError && <div className='help-block'><small>{ nameError }</small></div> }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" id="description" name="description" />
                                    </div>
                                    <div className="row pt-3 mb-5">
                                        <div className="col">
                                            <input type="submit" className="btn btn-success btn-block active" defaultValue="Add me!" />
                                        </div>
                                        <div className="col">
                                            <a href="/home">
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
    const { subject } = state;
    return {
        subject
    };
}

export default connect(mapStateToProps)(New_subject);
