import React, { Component } from 'react';
import Footer from './Footer.js'
import '../styles/App.css';

class App extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <h1 className="title deepshadow">Proyecto ungrupo</h1>
        <div className="mx-5">
          <div className="content">
            <p className="text-intro">Proyecto ungrupo es creado con el fin de crear un espacio en el cual la comunidad academica 
            incluyendo estudiantes y profesores puedan interactuar entre ellos con el fin de hacer más dinamico y facil el aprendizaje</p>
            <div className="row py-5">
              <div className="col move-to-right"><button className="custom-button">Log in</button></div>
              <div className="col"><button className="custom-button">sign up</button></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
