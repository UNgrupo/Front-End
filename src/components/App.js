import React, { Component } from 'react';
import { connect } from 'react-redux';

import CarouselComp from './CarouselComp.js';
import Loading from './Loading.js';
import Footer from './Footer.js';

import photoActions from '../_actions/actions-photo';

import '../styles/App.css';
import '../styles/Titles.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isDataLoaded: false
    };
  }

  async componentDidMount(){

    await this.props.dispatch( photoActions.getCollectionHome() );

    await this.setState( {isDataLoaded: true} );
  }
  
  render() {

    if( !this.state.isDataLoaded ){
      return <Loading />;
    }

    const headersSlides = ['Colaboración', 'Compañerismo', 'Estudio'];

    return (
      <div >

        <div className='padding-intro'>

          <h1 className='title-home deepshadow'>PROYECTO UNGRUPO</h1>
          
          <div className='px-5 mx-2'>
            <CarouselComp photos={this.props.photo} height={'500px'} captionHeader={headersSlides} captionText={['','','']} /> 
          </div>

          <div className='mx-5'>
            <div>
              <p className='text-intro'>Proyecto ungrupo es creado con el fin de tener un espacio en el cual la comunidad academica 
                incluyendo estudiantes y profesores puedan interactuar entre ellos con el fin de hacer más dinamico y facil el aprendizaje</p>
              <div className='row mb-4'>
                <div className='col text-right'>
                  <a href='/log_in'><button className='custom-button'>Log in</button></a> 
                </div>
                <div className='col'>
                  <a href='/sign_up'><button className='custom-button'>Sign up</button></a>
                </div>
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
  const { photo } = state;
  return {
    photo
  };
}

export default connect(mapStateToProps)(App);
