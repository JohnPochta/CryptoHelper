import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message } from 'semantic-ui-react';

class AfterAuthModal extends Component {
  handleItemClick = (e, { name }) => { this.props.PostResponse(0) };
  render() {
    let flag = false;
    let message = '';
    if (this.props.signal){
      flag = true;
      if (this.props.signal===1){
        message = 'Wrong password or email';
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
            <Button floated='right' positive onClick={this.handleItemClick}>OK</Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
  	)
  }
};
export default connect(
	state => ({
    signal : state.MainPage.auth_response,
	}),
	dispatch => ({
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    },
    PostResponse : (choose) => {
      dispatch({ type : 'AUTH_RESPONSE', payload : choose})
    },
	})
)(AfterAuthModal);