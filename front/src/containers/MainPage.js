import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Divider } from 'semantic-ui-react';
import LoginModal from '../components/MainPageComponents/LoginModal.js';
import SignUpModal from '../components/MainPageComponents/SignUpModal.js';
import AfterSignUpModal from '../components/MainPageComponents/AfterSignUpModal.js';
import AfterAuthModal from '../components/MainPageComponents/AfterAuthModal.js';
class MainPage extends Component {
  handleItemClick1 = (e, { name }) => { this.props.ModalChoose(0)};
  handleItemClick2= (e, { name }) => { this.props.ModalChoose(1)};
  render() {
    this.props.ModalChoose(-1);
  	return(
      <Segment padded>
        <Button onClick={this.handleItemClick1} primary fluid>Login</Button>
        <Divider horizontal>Or</Divider>
        <Button onClick={this.handleItemClick2} secondary fluid>Sign Up Now</Button>
        <LoginModal />
        <SignUpModal />
        <AfterSignUpModal />
        <AfterAuthModal />
      </Segment>
  	)
  }
};
export default connect(
	state => ({
	}),
	dispatch => ({
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    }
	})
)(MainPage);