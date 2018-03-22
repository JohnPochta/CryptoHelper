import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class GetDepthButton extends Component {
  SendDepthRequest(Selected_Pair){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/depth/"+Selected_Pair+'?limit=15')
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.DepthResponse(respJSON));
  }
  render() {
    var verdict = true;
    if (this.props.selected_pair!=''){
      verdict = false;
    }
  	return(
      <Button onClick={ (e) => {this.SendDepthRequest(this.props.selected_pair)} } disabled={verdict} color='red' animated>
        <Button.Content visible>Order Statistic</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
  	)
  }
};

export default connect(
	state => ({
    selected_pair : state.PairSelect.pair,
	}),
	dispatch => ({
    DepthResponse : (choose) => {
      dispatch({ type : 'DEPTH_RESPONSE', payload : choose})
    }
	})
)(GetDepthButton);