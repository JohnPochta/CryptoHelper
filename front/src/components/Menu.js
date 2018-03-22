import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Menu, Label } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'

class Menu_ extends Component {

  Brancher(data){
    if (data.status==='Wrong'){
      this.props.history.push('/');
    }
    else{
      this.props.AVATAR(data.picture);
      this.props.MENU_LOGIN(data.login);
      if (data.pairs){
        this.props.PAIRS_SELECT(data.pairs);
      }
    }
  }
  GetInfo(){
    //console.log(this.props.activeItem);
    fetch('/client/'+this.props.activeItem, {credentials: "same-origin"})
    .then(data => data.json())
    .then(data => this.Brancher(data))
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
  Logout(t){
    fetch('/client/logout', { method: 'POST', credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(data => data.json())
    .then(t.props.history.push('/'))
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  handleItemClick = (e, { name }) => this.props.Other_Page(name);

  render() {
    this.GetInfo();
  	return(
      <Menu>
        <Menu.Item as={Link} to='/homepage' name='homepage' active={this.props.activeItem === 'homepage'} onClick={this.handleItemClick}>Homepage</Menu.Item>
        <Menu.Item as={Link} to='/analizator' name='analizator' active={this.props.activeItem === 'analizator'} onClick={this.handleItemClick}>Analizator Page</Menu.Item>
        <Menu.Item name='alarm' active={this.props.activeItem === 'alarm'} onClick={this.handleItemClick}>Alarm</Menu.Item>
        <Menu.Menu position='right'>
          <Label size="big" as='a' color='blue'>
            Hello,
            <Label.Detail>{this.props.activeName}</Label.Detail>
          </Label>
          <Menu.Item name='logout' active={ this.props.activeItem === 'logout'} onClick={()=>this.Logout(this)} />
        </Menu.Menu>
      </Menu>
  	)
  }
};

export default connect(
	state => ({
    activeItem : state.Menu.activeItem,
    activeName : state.Menu.login,
	}),
	dispatch => ({
    Other_Page : (choose) => {
      dispatch({ type : 'GO', payload : choose})
    },
    MENU_LOGIN : (choose) => {
      dispatch({ type : 'LOGIN', payload : choose})
    },
    AVATAR : (choose) => {
      dispatch({ type : 'AVATAR', payload : choose})
    },
    PAIRS_SELECT : (choose) => {
      dispatch({ type : 'SELECT_SELECTED_PAIRS', payload : choose})
    },
	})
)(withRouter(Menu_));