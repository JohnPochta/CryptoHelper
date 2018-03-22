import React, { Component } from 'react';
import { connect } from 'react-redux';
import RefreshWorkSpace from './RefreshWorkSpace.js';
import PairSelector from './PairSelector.js';
import GetTickerButton from './GetTickerButton.js';
import CryptocurencySelector from './CryptocurencySelector.js';
import SelectedPairTable from './SelectedPairTable.js';
import AddPairToSelectedButton from './AddPairToSelectedButton.js';
import { Button, Icon } from 'semantic-ui-react';


class Arena extends Component {
  GetInfo(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/info")
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.onSelectInfo(respJSON));
  }
  render() {
    this.GetInfo();
  	return(
  		<div>
        <CryptocurencySelector />
        <PairSelector />
        <AddPairToSelectedButton />
        <SelectedPairTable />
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
)(Arena);