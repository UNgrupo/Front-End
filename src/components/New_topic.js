import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import subjectActions from '../_actions/actions-subject';
import topicActions from '../_actions/actions-topic';

class New_topic extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name: '',
            submitted: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    async componentDidMount(){
        const { subject_id } = this.props.match.params;
        
        await this.props.dispatch( subjectActions.getById( subject_id ) );
    }
    
    async handleSubmit(e){
        e.preventDefault();
        
        const name = e.target.elements.name.value;
        
        const newTopic = {
            name,
            subject_id: this.props.subject.id
        };
        
        if( name )
            await this.props.dispatch( topicActions.addNew( newTopic ) );
            
        this.setState({
            submitted: true
        });
    }
    
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    render(){
        
        //if( this.props.topic.success )
            //window.location.href = "/topics/" + this.props.subject.id;
        
        const { name, submitted } = this.state;
        const { success, data } = this.props.topic;
        
        let nameError = '';
        if( !success && data.data)
            nameError = data.data.name;
            
        return(
            <div>
                
                <Navbar />
                
                <div className="panel py-5 my-5 container">
                    <div className="container-form-pad ">
                        <div className="container-form-2">
                            <div className="panel-heading my-3 text-center">
                                <h1 className="title-l">New Topic of {(this.props.subject.attributes ? this.props.subject.attributes.name: '')} </h1>
                            </div>
                            <div className="panel-body px-5">
                                <form onSubmit={ this.handleSubmit } className="pt-3">
                                    { submitted && !success && <div><big>{data.data}</big></div>}
                                    <div className={'form-group' + ( submitted && ( !name || nameError ) ? ' has-error': '')}>
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.handleChange}/>
                                        { submitted && !name && <div className='help-block'><small>Name is required</small></div> }
                                        { submitted && !nameError && <div className='help-block'><small>{nameError}</small></div> }
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
                                            <a href={"/topics/"+this.props.subject.id}>
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
    const { topic, subject } = state;
    return {
        topic,
        subject
    };
}

export default connect(mapStateToProps)(New_topic);
