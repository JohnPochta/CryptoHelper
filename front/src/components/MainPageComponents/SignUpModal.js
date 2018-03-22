import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message } from 'semantic-ui-react';
import SignUpForm from './SignUpForm.js';

class SignUpModal extends Component {
  handleItemClick = (e, { name }) => { this.props.ModalChoose(-1)};
  render() {
    this.props.SignUpFormInitial(true);
    let flag = false;
    if (this.props.signal===1){
      flag = true;
    }
  	return(
      <Modal size='tiny' dimmer='inverse' open={flag} onClose={this.handleItemClick}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <SignUpForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
  	)
  }
};
export default connect(
	state => ({
    signal : state.MainPage.activeModal,
	}),
	dispatch => ({
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    },
    SignUpFormInitial : (choose) => {
      dispatch({ type : 'TO_INITIAL', payload : choose})  
    },
	})
)(SignUpModal);