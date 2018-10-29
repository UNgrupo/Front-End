import Common from './actions-common';
import axios from 'axios';

import authHeader from '../Auth-header.js';
import api_route from '../route';

const element = 'comments';
const commonActions = new Common(element);

const commentActions = {
    ...commonActions.getActions,
    getAllCommentsOfQuestion
};

export default commentActions;

function getAllCommentsOfQuestion(  ){
    return dispatch => {
        document.body.classList.add('busy-cursor');
        axios.get(api_route + 'comments', {headers: authHeader()})
        .then(response => {
            axios.get(api_route + 'answers', {headers: authHeader()})
            .then(responseAnswers => {
                let comments = [];
                const resComments = response.data.data;
                const answers = responseAnswers.data.data;
                for(let i=0; i<answers.length; i++){
                    let comments_i = [];
                    for(let j=0; j<resComments.length; j++){
                        if(answers[i].id.toString() === resComments[j].attributes['answer-id'].toString())
                            comments_i.push(resComments[j]);
                    }
                    comments.push(comments_i);
                }
                dispatch( success( comments ) );
            })
            .catch(error => {
                dispatch( failure( error.message ) );
            });
            /*
            let comments = [];
            const resComments = response.data.data;
            for(let i=0; i<answers.length; i++){
                let comments_i = [];
                for(let j=0; j<resComments.length; j++){
                    if(answers[i].id.toString() === resComments[j].attributes['answer-id'].toString())
                        comments_i.push(resComments[j]);
                }
                comments.push(comments_i);
            }
            comments.sort(sortFunction);
            dispatch( success( comments ) );*/
        })
        .catch(error => {
            dispatch( failure( error.message ) );
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success( comments ){ return { type: 'GET-COMMENTS-SUCCESS', data: comments} }
    function failure( error ){ return { type: 'GET-COMMENTS-SUCCESS', data: error} }
}