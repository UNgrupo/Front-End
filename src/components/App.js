import React, { Component } from 'react';
import logo from '../resources/logo.svg';
import { Button, Navbar, Row, Col } from 'reactstrap';
import '../styles/App.css';

class App extends Component {
  
  render() {
    return (
      
      <div className="Container">
        <Row className="Navbar">
        <Col />
        <Col />
        <Col />
        <Col>
      
            <Button className="custom-button">Log in</Button>
            <Button className="custom-button">Sign up</Button>
            </Col>
        </Row>
        <h1 className="App-title">Our web page</h1>
        <Row className="content">
          <img src={logo} className="App-logo" alt="logo" />
          asdasdwqdqwdasdasdsadsasdkjasldas
          sadqweqsadasdas
        </Row>
        <Row className="footer">
          info: 12345489
          corre: 564686@asd
        </Row>
      </div>
    );
  }
}

export default App;
