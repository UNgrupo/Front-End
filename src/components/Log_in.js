import React, { Component } from 'react';
import Footer from './Footer.js'
import '../styles/Log_in-Sign_up.css';


class Log_in extends Component {
  
  constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        
    }
    
  handleSubmit(e){
  this.setState({
      email: e.target.email.value,
      password: e.target.password.value
    })
  }
  
  render() {
    
    return (
      <div className="container">
        <h1 className="title-initial-forms deepshadow">Proyecto ungrupo</h1>
        <div className="container-form-pad">
          <div className="container-form p-4">
            <h1 className="display-3 title-l">Log in</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-left">
                <div className="form-group pt-2">
                  <label for="email">Email (*):</label>
                  <input type="email" placeholder="example@unal.edu.co" className="form-control" id="email" required/>
                </div>
                <div className="form-group">
                  <label for="password">Password (*):</label>
                  <input type="password" name="password" placeholder="password" className="form-control" id="password" required/>
                </div>
              </div>
              <div className="pt-4">
                <button className="btn btn-success btn-block active">Log me in!</button>
              </div>
              <div className="row pt-4">
                <div className="col">
                  <a href="#">Did you forget password?</a>
                </div>
                <div className="col">
                  <a href="/sign_up">Want to sign up?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Log_in;