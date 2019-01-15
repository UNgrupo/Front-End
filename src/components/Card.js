import React, {Component} from 'react';
import { connect } from 'react-redux';

import DeleteItem from './DeleteItem';

import subjectActions from '../_actions/actions-subject';
import topicActions from '../_actions/actions-topic';

import '../styles/Card.css';

class Card extends Component{

    constructor(props){
      super(props);

      this.canUserDrop = this.canUserDrop.bind(this);
      this.deleteCard = this.deleteCard.bind(this);
    }

    deleteCard( id, type ){

      const { dispatch } = this.props;

      switch( type ){
        case 'subject':
          dispatch( subjectActions.delete( id ) );
          window.location.reload(true);
        case 'topic':
          dispatch( topicActions.delete( id ) );
          window.location.reload(true);
        default:
          return () => {};
      }
    }

    canUserDrop(id, type){

      const { user } = this.props;
      
      const trashIcon = <span className='d-flex justify-content-center clickable'>
                          <i className="fas fa-trash-alt"></i>
                        </span>

      const _delete = <DeleteItem 
                          item={trashIcon} 
                          textModal={'Are you sure that you want to delete this ' + type + '?'}
                          titleModal={'Delete ' + type}
                          deleteFunction={() => {this.deleteCard(id, type)}}
                      />
      
      return (user.attributes.role === 'admin' ? _delete : '');
  }
    
    render(){

      console.log(window.location);

      const { type, id, canBeDeleted, key } = this.props;
        return(
            
            <div key={key} className='col-md-4 no-decoration'>
              <div className='card-style'>
                <div className='card my-3 image-card card-style' >
                  <a href={this.props.route} >
                    <div className='card-style'>
                      <img src={'https://source.unsplash.com/random?sig=' + Math.floor((Math.random() * 100) + 1)} width='100%' height='200' alt='card' className='image-card card-style'/> 
                      {this.props.description && <p className='mt-1'>{this.props.description}</p>}
                    </div>
                    <div className='card-footer'>
                      {this.props.title}
                    </div>
                  </a>
                  { canBeDeleted ? this.canUserDrop( id, type ) : ''}
                </div>
              </div>
            </div>
            
        );
    }
    
}

Card.defaultProps = {
  canBeDeleted: false
}

export default connect()(Card);