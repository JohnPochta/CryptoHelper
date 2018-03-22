import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class GetTickerButton extends Component {
  SendTickerRequest(Selected_Pair){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/ticker/"+Selected_Pair)
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.TickerResponse(respJSON));
  }
  render() {
    var verdict = true;
    if (this.props.selected_pair!=''){
      verdict = false;
    }
  	return(
      <Button onClick={ (e) => {this.SendTickerRequest(this.props.selected_pair)} } disabled={verdict} color='red' animated>
        <Button.Content visible>24 Hour Statistic</Button.Content>
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
    TickerResponse : (choose) => {
      dispatch({ type : 'TICKER_RESPONSE', payload : choose})
    }
	})
)(GetTickerButton);