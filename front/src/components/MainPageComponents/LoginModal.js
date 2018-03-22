import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form } from 'semantic-ui-react';
import LoginForm from './LoginForm.js';

class LoginModal extends Component {
  handleItemClick = (e, { name }) => { this.props.ModalChoose(-1)};
  render() {
    let flag = false;
    if (this.props.signal===0){
      flag = true;
    }
  	return(
      <Modal size='tiny' dimmer='inverse' open={flag} onClose={this.handleItemClick}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <LoginForm />
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
    }
	})
)(LoginModal);