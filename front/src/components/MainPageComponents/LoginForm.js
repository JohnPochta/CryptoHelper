import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class SignUpForm extends Component {
  handleItemClick = (e, {value}) => {
    this.props.ModalChoose(-1);
  };
  handleEmailFieldChange = (e, { value}) => {
    this.props.EmailFieldChange(value);
  };
  handlePasswordFieldChange = (e, { value}) => {
    this.props.PasswordFieldChange(value);
  };
  Brancher(data){
    if (data==='OK'){
      this.props.PostResponse(0);
      this.props.history.push('/homepage');
    }
    else if (data==='Wrong'){
      this.props.PostResponse(1);
    }
  }
  handleSubmit(){
    let new_user = {
      password : this.props.password_field,
      email : this.props.email_field,
    };
    fetch('/login', {
    method: 'POST',
    credentials: "same-origin",
    headers: {
      "Content-Type" : "application/json"
    },
      body: JSON.stringify(new_user)
    })
    .then(data => data.json())
    .then(data => this.Brancher(data.status))
    .catch(function (error) {
    console.log('Request failed', error);
    });
  }
  render() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailfielderror = true;
    let passwordfielderror = true;
    if (re.test(String(this.props.email_field).toLowerCase())){
      emailfielderror = false;
    }
    if (this.props.password_field.length>=8){
      passwordfielderror = false;
    }
    let is_form_ready = true;
    if (!(emailfielderror || passwordfielderror)){
      is_form_ready = false;
    }
  	return(
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <Form.Input maxLength="254" onChange={this.handleEmailFieldChange} placeholder='smth@example.com' type='email' />
        </Form.Field>
        <Form.Field>
          <Form.Input maxLength="32" onChange={this.handlePasswordFieldChange} type='password' />
        </Form.Field>
        <Modal.Actions>
          <Button disabled={is_form_ready} floated='right' type='submit' positive icon='checkmark' labelPosition='right' content="Done!" />
          <Button floated='right' negative onClick={this.handleItemClick}>
            Back
          </Button>
        </Modal.Actions>
      </Form>
  	)
  }
};
export default connect(
	state => ({
    email_field : state.MainPageLoginForm.emailInput,
    password_field : state.MainPageLoginForm.passwordInput,
	}),
	dispatch => ({
    EmailFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_EMAIL_AUTH', payload : choose})
    },
    PasswordFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_PASSWORD_AUTH', payload : choose})
    },
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    },
    PostResponse : (choose) => {
      dispatch({ type : 'AUTH_RESPONSE', payload : choose})
    },
	})
)(withRouter(SignUpForm));