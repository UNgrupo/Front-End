import axios from 'axios';

import authHeader from '../_helpers/Auth-header.js';
import API_ROUTE from '../_helpers/Route-api';

class Common {

    constructor(element){
        this.element = element;
    }
    
    get getActions(){
        
        const updateStatistics = ( id, element ) => { //ACA
            switch( element ){
                case 'answers':
                    makeUpdate( id, 'number_of_answers' );
                    return;
                case 'questions':
                    makeUpdate( id, 'number_of_questions' );
                    return;
                default:
                    return;
                }
            function makeUpdate( id, attribute ){
                axios.get(API_ROUTE + 'statistics/' + id, {headers: authHeader()})
                .then(statistic => {
                    let newStatistic = {};
                    if( attribute === 'number_of_questions')
                        newStatistic = { 'number_of_questions': statistic.data.data.attributes['number-of-questions'] + 1 };
                    else
                        newStatistic = { 'number_of_answers': statistic.data.data.attributes['number-of-answers'] + 1 };
                    axios.patch(API_ROUTE + 'statistics/' + id , newStatistic, {headers: authHeader()});
                
                });
            };
        };

        const getAll = () => {
            const auxElement = this.element.toUpperCase();
        
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.get(API_ROUTE + (this.element === 'users' ? 'users.json' : this.element), {headers: authHeader()})
                .then(response => {
                    dispatch( success( response.data.data ) );
                })
                .catch(error => {
                    dispatch( failure( error.message ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( object ){ return { type: 'GET-' + auxElement + '-SUCCESS', data: object } }
            function failure( error ){ return { type: 'GET-' + auxElement + '-FAILURE', data: error} }
        };
        
        const getAllByForeanId = ( foreanId, foreanElement, sortFunction = undefined) => {
            
            const auxElement = this.element.toUpperCase();
            
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.get(API_ROUTE + this.element, {headers: authHeader()})
                .then(response => {
                    const resAnswers = response.data.data;
                    var answers = [];
                    for(let i=0; i<resAnswers.length; i++){
                        if(resAnswers[i].attributes[foreanElement + '-id'] === parseInt(foreanId, 10))
                            answers.push(resAnswers[i]);
                    }
                    answers.sort(sortFunction);
                    dispatch( success( answers ) );
                })
                .catch(error => {
                    dispatch( failure( error.message ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( data ){ return { type: 'GET-' + auxElement + '-SUCCESS', data: data } }
            function failure( error ){ return { type: 'GET-' + auxElement + '-FAILURE', data: error} }
        };
        
        const getById = (id) => {
        
            const auxElement = this.element.slice(0, -1).toUpperCase();
            
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.get(API_ROUTE + this.element + '/' + id, {headers: authHeader()})
                .then(response => {
                    dispatch( success( response.data.data ) );
                })
                .catch(error => {
                    dispatch( failure( error.message ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( object ){ return { type: 'GET-' + auxElement + '-SUCCESS', data: object } }
            function failure( error ){ return { type: 'GET-' + auxElement + '-FAILURE', data: error} }
        };
        
        const addNew = ( objectToAdd ) => {
        
            const auxElement = this.element.slice(0, -1).toUpperCase();
            const capitalizedAuxElement = auxElement.charAt(0).toUpperCase() + auxElement.slice(1);
            
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.post(API_ROUTE + this.element, objectToAdd, {headers: authHeader()})
                .then(async response => {
                    const user = JSON.parse(window.localStorage.getItem('user'));
                    await updateStatistics( user.id, this.element);
                    await dispatch( success( capitalizedAuxElement + ' added' ) );
                })
                .catch(error => {
                    dispatch( failure( error.response ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( object ){ return { type: 'ADD-' + auxElement + '-SUCCESS', data: object } }
            function failure( error ){ return { type: 'ADD-' + auxElement + '-FAILURE', data: error} }
        };
    
        const _delete = ( id ) => {
            
            const auxElement = this.element.slice(0, -1).toUpperCase();
            const capitalizedAuxElement = auxElement.charAt(0).toUpperCase() + auxElement.slice(1);
            
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.delete(API_ROUTE + this.element + '/' + id, {headers: authHeader()})
                .then(response => {
                    dispatch( success( capitalizedAuxElement + ' deleted' ) );
                })
                .catch(error => {
                    dispatch( failure( error.message ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( object ){ return { type: 'DELETE-' + auxElement + '-SUCCESS', data: object } }
            function failure( error ){ return { type: 'DELETE-' + auxElement + '-FAILURE', data: error} }
        };
        
        const update = (id, data) => {
            
            const auxElement = this.element.slice(0, -1).toUpperCase();
            const capitalizedAuxElement = auxElement.charAt(0).toUpperCase() + auxElement.slice(1);
            
            return async dispatch => {
                document.body.classList.add('busy-cursor');
                await axios.patch(API_ROUTE + this.element + '/' + id , data, {headers: authHeader()})
                .then(response => {
                    dispatch( success( capitalizedAuxElement + ' updated' ) );
                })
                .catch(error => {
                    dispatch( failure( error.message ) );
                });
                document.body.classList.remove('busy-cursor');
            };
            
            function success( object ){ return { type: 'UPDATE-' + auxElement + '-SUCCESS', data: object } }
            function failure( error ){ return { type: 'UPDATE-' + auxElement + '-FAILURE', data: error} }
        };
        
        return {
            getAll,
            getAllByForeanId,
            getById,
            addNew,
            delete: _delete,
            update
        };
    }
}

export default Common;