import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message } from 'semantic-ui-react';
import SignUpForm from './SignUpForm.js';

class AfterSignUpModal extends Component {
  handleItemClick = (e, { name }) => { this.props.PostResponse(0) };
  render() {
    let flag = false;
    let message = '';
    if (this.props.signal){
      flag = true;
      if (this.props.signal===1){
        message = 'You were succesfully registreted';
        this.props.ModalChoose(-1);
      }
      else if (this.props.signal===2){
        message = 'User with this e-mail already exist';
      }
      else if (this.props.signal===3){
        message = 'User with this login already exist';
      }
    }
  	return(
      <Modal size='tiny' dimmer='inverse' open={flag} onClose={this.handleItemClick}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {message}
          </Modal.Description>
          <Modal.Actions>
            <Button floated='right' negative onClick={this.handleItemClick}>Back</Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
  	)
  }
};
export default connect(
	state => ({
    signal : state.MainPage.post_response,
	}),
	dispatch => ({
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    },
    PostResponse : (choose) => {
      dispatch({ type : 'POST_RESPONSE', payload : choose})
    },
	})
)(AfterSignUpModal);