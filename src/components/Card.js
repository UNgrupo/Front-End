import React, {Component} from 'react';

class Card extends Component{
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            
            <div className="col-md-4">
              <div className="card my-3 text-center">
                <div className="card-header">
                  <h4>{this.props.title.toUpperCase()}</h4>
                </div>
                <div className="card-body">
                  <p>{this.props.description}.</p>
                </div>
                <div className="card-footer">
                  <a href={this.props.route}>
                    <button className="btn btn-success btn-lg"><div className="px-5"> Go in! </div></button>
                  </a>
                </div>
              </div>
            </div>
            
        );
    }
    
}

export default Card;