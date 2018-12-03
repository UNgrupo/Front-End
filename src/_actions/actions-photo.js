import axios from 'axios';

const appId = 'a5a706c887e0cfdeed7bf5c008ec3ee4144228f9f0eeb3d95ecd113c39c2d2dd';
const apiUnsplash = 'https://api.unsplash.com/';

const photoActions = {
    getCollectionHome
}

export default photoActions;

function getCollectionHome(){
    return async dispatch => {
        document.body.classList.add('busy-cursor');
        await axios.get(apiUnsplash + 'collections/3565848/?client_id=' + appId)
        .then( response => {
            dispatch( success( response.data.preview_photos ) );
        })
        .catch( error => {
            dispatch( failure( error.message ) );
        });
        document.body.classList.remove('busy-cursor');
    };
    function success( photos ) { return{ type: 'GET-PHOTOS-SUCCESS', data: photos } }
    function failure( error ) { return{ type: 'GET-PHOTOS-FAILURE', data: error } }
}