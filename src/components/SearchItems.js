import React, { Component } from 'react';
import { connect } from 'react-redux';

import answerActions from '../_actions/actions-answer';
import questionActions from '../_actions/actions-question';
import commentActions from '../_actions/actions-comment';
import paginationActions from '../_actions/actions-pagination';
import userActions from '../_actions/actions-user';

import { doSearch } from '../scripts/DoSearch.js';

import CLOUDINARY_PATH from '../_helpers/Cloudinary-path';

import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';
import ShowText from './ShowText';
import Pagination from './Pagination';

import '../styles/Search.css';
import '../styles/Titles.css';

class SearchItem extends Component{

    constructor(props){
        super(props);

        this.state = {
            isDataLoaded: false,
            dataMatched: []
        };

        this.getUrl = this.getUrl.bind(this);
    }

    async componentDidMount(){
        
        const { dispatch } = this.props;
        const { textToMatch } = this.props.match.params;

        await dispatch( answerActions.getAll() );
        await dispatch( questionActions.getAll() );
        await dispatch( commentActions.getAll() );
        await dispatch( userActions.getAll() );

        const { question, answer, comment } = this.props;
        const dataMatched = doSearch( textToMatch, [question, answer, comment] )

        await dispatch( paginationActions.setPage( dataMatched ) );

        await this.setState({ 
            isDataLoaded: true,
            dataMatched
        });
    }

    getUrl( data ){

        const { type } = data;
        switch( type ){
            case 'questions': {
                const { id } = data;
                const topic_id = data.attributes['topic-id'];
                return '../questions/' + topic_id + '/' + id;
            }
            case 'answers': {
                const question_id = data.attributes['question-id'];
                const { question } = this.props;
                const topic_id = question[question_id-1].attributes['topic-id'];
                return '../questions/' + topic_id + '/' + question_id;
            }
            case 'comments':{
                const answer_id = data.attributes['answer-id'];
                const { question, answer } = this.props;
                const question_id = answer[answer_id-1].attributes['question-id'];
                const topic_id = question[question_id-1].attributes['topic-id'];
                return '../questions/' + topic_id + '/' + question_id;
            }
            default:
                return null;
        }
    }

    render(){

        const { isDataLoaded, dataMatched } = this.state;
        if( !isDataLoaded )
            return <Loading />

        const dataPaginated = this.props.pagination.map( ( data, i ) => {
            
            const { type } = data;
            const { title, description } = data.attributes;
            const user_id = data.attributes['user-id'];
            const { usern, ruta } = (this.props.user)[user_id-1].attributes;
            const photo = CLOUDINARY_PATH + ( ruta ? ruta : 'v1545351717/Ungrupo/User_icon_2.svg.png' );
            const redirectUrl = this.getUrl(data);

            return (
                <div key={i} className='mx-5 my-3 px-5 text-style'>
                    <div className='mx-5'>
                        <h3 className='txt-style'>{ type.charAt(0).toUpperCase() + type.slice(1, type.length-1) }</h3>
                        <div className='mx-5'>
                            <a href={redirectUrl} className='a-s'>
                                <b><p>{ (title ? 'Title: ' + title : '' )}</p></b>
                                <div className='d-flex flex-row'>
                                    <b><p className='mr-2'>Description: </p></b>
                                    <ShowText value={description} />
                                </div>
                            </a>
                            <a href={'../' + usern} className='a-s row mx-2'>
                                <img src={photo} alt='' id='imgProfile' className='img-thumbnail img-style mr-2' />
                                <p>{ usern }</p>
                            </a>
                        </div>
                    </div>
                    <hr />
                </div>
            );
        });

        const noDataMatched = <h2 className='mx-5 my-5'>No data matched with your search</h2>

        const { textToMatch } = this.props.match.params;

        return(
            <div>
                <Navbar />

                <div className='container'>
                    <h1 className='title-search py-5'>Results of "{textToMatch}"</h1>
                    { (dataPaginated.length !== 0 ? dataPaginated : noDataMatched) } 
                </div>

                <Pagination data={dataMatched}/>

                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state){
    const { answer, comment, question, pagination, user } = state;
    return {
        answer,
        comment,
        question,
        pagination,
        user
    };
}

export default connect(mapStateToProps)(SearchItem);