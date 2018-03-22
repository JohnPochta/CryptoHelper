import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class GetTradesButton extends Component {
  SendTradesRequest(Selected_Pair){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/trades/"+Selected_Pair+'?limit=35')
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.TradesResponse(respJSON));
  }
  render() {
    var verdict = true;
    if (this.props.selected_pair!=''){
      verdict = false;
    }
  	return(
      <Button onClick={ (e) => {this.SendTradesRequest(this.props.selected_pair)} } disabled={verdict} color='red' animated>
        <Button.Content visible>Trades Statistic</Button.Content>
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
    TradesResponse : (choose) => {
      dispatch({ type : 'TRADES_RESPONSE', payload : choose})
    }
	})
)(GetTradesButton);