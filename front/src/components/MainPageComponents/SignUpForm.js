import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message } from 'semantic-ui-react';

class SignUpForm extends Component {
  handleItemClick = (e, {value}) => {
    this.props.ModalChoose(-1);
  };
  handleLoginFieldChange = (e, { value}) => {
    this.props.LoginFieldChange(value);
  };
  handleEmailFieldChange = (e, { value}) => {
    this.props.EmailFieldChange(value);
  };
  handlePasswordFieldChange = (e, { value}) => {
    this.props.PasswordFieldChange(value);
  };
  handlePasswordCheckFieldChange = (e, { value}) => {
    this.props.PasswordCheckFieldChange(value);
  };
  handleCheckboxClick = () => {
    if (this.refs.agree_checkbox.state.checked){
      this.props.Checked(false);
    }
    else{
      this.props.Checked(true);
    }
  };
  Brancher(data){
    if (data==='OK'){
      this.props.PostResponse(1);
    }
    else if (data==='ALREADY EMAIL'){
      this.props.PostResponse(2);
    }
    else if (data==='ALREADY LOGIN'){
      this.props.PostResponse(3);
    }
  }
  handleSubmit(){
    let new_user = {
      login : this.props.login_field,
      password : this.props.password_field,
      email : this.props.email_field,
    };
    fetch('/registration', {
    method: 'POST',
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
    let loginfielderror = true;
    let emailfielderror = true;
    let passwordfielderror = true;
    let passwordcheckfielderror = true;
    let ischeck = true;
    if ((this.props.login_field.length>=6) && (/^[0-9a-zA-Z]+$/.test(this.props.login_field)) && (/^[a-zA-Z]+$/.test(this.props.login_field[0]))){
      loginfielderror = false;
    }
    if (re.test(String(this.props.email_field).toLowerCase())){
      emailfielderror = false;
    }
    if (this.props.password_field.length>=8){
      passwordfielderror = false;
    }
    if ( (this.props.password_check_field===this.props.password_field) && (this.props.password_check_field.length>=8) ){
      passwordcheckfielderror = false;
    }
    ischeck = !this.props.ischecked;
    let is_form_ready = true;
    if (!(loginfielderror || emailfielderror || passwordfielderror ||  passwordcheckfielderror || ischeck)){
      is_form_ready = false;
    }
  	return(
      <Form onSubmit={this.handleSubmit.bind(this)} warning>
      <Form.Field>
        <label>Login</label>
        <Form.Input maxLength="25" onChange={this.handleLoginFieldChange} placeholder='more then 6 and less then 25 characters (alphanumerical only)' error={loginfielderror} />
      </Form.Field>
      <Form.Field>
        <label>E-mail</label>
        <Form.Input maxLength="254" onChange={this.handleEmailFieldChange} placeholder='smth@example.com' error={emailfielderror} type='email' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Form.Input type='password' maxLength="32" onChange={this.handlePasswordFieldChange} placeholder='8+ characters' error={passwordfielderror} />
      </Form.Field>
      <Form.Field>
        <label>Repeat Password</label>
        <Form.Input type='password' maxLength="32" onChange={this.handlePasswordCheckFieldChange} placeholder='8+ characters' error={passwordcheckfielderror} />
      </Form.Field>
      <Form.Field>
        <Checkbox ref="agree_checkbox" onClick={this.handleCheckboxClick} label='I agree to the Terms and Conditions' />
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
    login_field : state.MainPageSignUpForm.loginInput,
    email_field : state.MainPageSignUpForm.emailInput,
    password_field : state.MainPageSignUpForm.passwordInput,
    password_check_field : state.MainPageSignUpForm.passwordCheckInput,
    ischecked : state.MainPageSignUpForm.checked,
	}),
	dispatch => ({
    LoginFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_LOGIN', payload : choose})
    },
    EmailFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_EMAIL', payload : choose})
    },
    PasswordFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_PASSWORD', payload : choose})
    },
    PasswordCheckFieldChange : (choose) => {
      dispatch({ type : 'CHANGE_PASSWORD_CHECK', payload : choose})
    },
    Checked : (choose) => {
      dispatch({ type : 'CHECKED', payload : choose})
    },
    ModalChoose : (choose) => {
      dispatch({ type : 'CHOOSEN_MODAL', payload : choose})
    },
    PostResponse : (choose) => {
      dispatch({ type : 'POST_RESPONSE', payload : choose})
    },
	})
)(SignUpForm);