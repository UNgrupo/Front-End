import api_route from '../route';
import axios from 'axios';
import authHeader from '../Auth-header.js';

class Common {

    constructor(element){
        this.element = element;
    }
    
    get getActions(){
        
        const getAll = () => {
            const auxElement = this.element.toUpperCase();
        
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.get(api_route + (this.element === 'users' ? 'users.json' : this.element), {headers: authHeader()})
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
            
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.get(api_route + this.element, {headers: authHeader()})
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
            
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.get(api_route + this.element + '/' + id, {headers: authHeader()})
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
            
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.post(api_route + this.element, objectToAdd, {headers: authHeader()})
                .then(response => {
                    dispatch( success( capitalizedAuxElement + ' added' ) );
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
            
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.delete(api_route + this.element + '/' + id, {headers: authHeader()})
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
            
            return dispatch => {
                document.body.classList.add('busy-cursor');
                axios.put(api_route + this.element + '/' + id , data, {headers: authHeader()})
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