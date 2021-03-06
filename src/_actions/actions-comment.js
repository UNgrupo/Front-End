import Common from './actions-common';
import axios from 'axios';

import authHeader from '../_helpers/Auth-header.js';
import API_ROUTE from '../_helpers/Route-api';

const element = 'comments';
const commonActions = new Common(element);

const commentActions = {
    ...commonActions.getActions,
    getAllCommentsOfQuestion
};

export default commentActions;

function getAllCommentsOfQuestion(){
    return async dispatch => {
        document.body.classList.add('busy-cursor');
        await axios.get(API_ROUTE + 'comments', {headers: authHeader()})
        .then(async response => {
            await axios.get(API_ROUTE + 'answers', {headers: authHeader()})
            .then(async responseAnswers => {
                let comments = [];
                const resComments = response.data.data;
                const answers = responseAnswers.data.data;
                for(let i=0; i<answers.length; i++){
                    let comments_i = [];
                    for(let j=0; j<resComments.length; j++){
                        if(answers[i].id.toString() === resComments[j].attributes['answer-id'].toString())
                            comments_i.push(resComments[j]);
                    }
                    comments[answers[i].id-1] = comments_i;
                    //comments.push(comments_i);
                }
                await dispatch( success( comments ) );
            })
            .catch(error => {
                dispatch( failure( error.message ) );
            });
        })
        .catch(error => {
            dispatch( failure( error.message ) );
        });
        document.body.classList.remove('busy-cursor');
    };
    
    function success( comments ){ return { type: 'GET-COMMENTS-SUCCESS', data: comments} }
    function failure( error ){ return { type: 'GET-COMMENTS-SUCCESS', data: error} }
}