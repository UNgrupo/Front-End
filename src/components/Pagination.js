import React, { Component } from 'react';
import { connect } from 'react-redux';

import paginationActions from '../_actions/actions-pagination.js';

import { numberOfPages, getDataPage } from '../scripts/Pagination.js';

class Pagination extends Component{

    constructor(props){
        super(props);

        this.state = {
            numberOfPages: 1,
            actualPage: 1,
            canBackward: false,
            canForward: true
        };

        this.changePage = this.changePage.bind(this);
        this.movePage = this.movePage.bind(this);
        this.lookPosiblesMove = this.lookPosiblesMove.bind(this);
    }

    componentDidMount(){

        const data = getDataPage( this.props.data, this.state.actualPage );

        const { dispatch } = this.props;
        dispatch( paginationActions.setPage( data ) );

        this.setState({ 
            numberOfPages: numberOfPages( this.props.data ),
            ...this.lookPosiblesMove( 1 )            
        });
    }

    lookPosiblesMove( nextPage ){
        const numOfPages = numberOfPages( this.props.data );
        return {
            canBackward: ( nextPage === 1 ? false : true),
            canForward: ( nextPage === numOfPages  ? false : true)
        };
    }

    async changePage( page ){

        const data = getDataPage( this.props.data, page );

        const { dispatch } = this.props;
        await dispatch( paginationActions.setPage( data ) );

        await this.setState({ 
            actualPage: page,
            ...this.lookPosiblesMove( page )
        });

    }

    async movePage( direction ){

        const data = getDataPage( this.props.data, this.state.actualPage + direction );

        const { dispatch } = this.props;
        await dispatch( paginationActions.setPage( data ) );

        const actualPage = this.state.actualPage + direction;
        await this.setState({ 
            actualPage,
            ...this.lookPosiblesMove( actualPage )
        });
    }

    render(){

        const { canBackward, canForward, numberOfPages, actualPage } = this.state;

        const pages = [...Array(numberOfPages)].map( (_, i) => {
            const isActualPage = ( i+1 === actualPage ? ' disabled' : '');
            return(
                <li key={i} className={'page-item' + isActualPage}>
                    <a className={'page-link ' + (isActualPage ? 'bg-info' : '')}>
                        <span onClick={() => { this.changePage(i+1) }}>{i+1}</span>
                    </a>
                </li>
            );
        });

        return (
            <nav aria-label='Page navigation example' className='my-2'>
                <ul className='pagination justify-content-center'>
                    <li className={'page-item '+ ( !canBackward ? 'disabled' : '' )}>
                        <a className='page-link' href='#'>
                            <span onClick={() => {this.movePage(-1)}}>Previous</span>
                        </a>
                    </li>
                    {pages}
                    <li className={'page-item ' + ( !canForward ? 'disabled' : '' )}>
                        <a className='page-link' href='#'>
                            <span onClick={() => {this.movePage(1)}}>Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }

}

export default connect()(Pagination)

Pagination.defaultProps = {
    data: []
}