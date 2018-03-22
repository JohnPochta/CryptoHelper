/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class RefreshWorkSpace extends Component {
  GetInfo(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/info")
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.onSelectInfo(respJSON));
  }
  render() {
  	return(
  		<div>
      <Button animated='fade' onClick={this.GetInfo.bind(this)}>
        <Button.Content visible>
        Refresh 
        </Button.Content>
        <Button.Content hidden>
        <Icon name='refresh' />
        </Button.Content>
      </Button>
  		</div>
  	)
  }
};

export default connect(
	state => ({
	}),
	dispatch => ({
    onSelectInfo : (info) => {
      dispatch({ type : 'SELECT_INFO', payload : info})
    }
	})
)(RefreshWorkSpace);*/
