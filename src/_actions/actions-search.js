import axios from 'axios';

import authHeader from '../_helpers/Auth-header.js';
import API_ROUTE from '../_helpers/Route-api';

const searchActions = {
    bringData
};

export default searchActions;

function bringData(){
    return dispatch => {
        getSubjects( dispatch );
    };

    function getSubjects( dispatch ) {
        axios.get(API_ROUTE + 'subjects', {headers: authHeader()})
        .then( response => {
            getTopics( response.data.data, dispatch );
        })
        .catch(error => {
            dispatch( failure( error.message ) );
        });
    };

    function getTopics( accData, dispatch ){
        axios.get(API_ROUTE + 'topics', {headers: authHeader()})
        .then( response => {
            getQuestions( accData.concat( response.data.data ), dispatch );
        })
        .catch(error => {
            dispatch( failure( error.message ) );
        });
    };

    function getQuestions( accData, dispatch ){
        axios.get(API_ROUTE + 'questions', {headers: authHeader()})
        .then( response => {
            dispatch( success( accData.concat( response.data.data ) ) );
        })
        .catch(error => {
            dispatch( failure( error.message ) );
        });
    }

    function success( data ){ return { type: 'SUCCESS-BRING-DATA', data} };
    function failure( error ){ return { type: 'FAILURE-BRING-DATA', error} };
}