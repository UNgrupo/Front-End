import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class DeleteItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
    }
    
    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    deleteAction(){
        this.toggleModal();
        this.props.deleteFunction();
    }

    render(){
        return(
            <div>
                
                <span onClick={this.toggleModal}>{this.props.item}</span>

                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}> {this.props.titleModal} </ModalHeader>
                    <ModalBody> {this.props.textModal} </ModalBody>
                    <ModalFooter>
                        <button type='button' className='btn btn-success' onClick={ this.deleteAction }>Delete</button>
                        <button type='button' className='btn btn-danger' onClick={this.toggleModal}>Cancel</button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    } 
}

DeleteItem.defaultProps = {
    item: <button>Delete</button>, //Item que contendra el boton o imagen que se oprimira para borrar
    deleteFunction: () => {}, //Function
    textModal: '',
    titleModal: ''
};