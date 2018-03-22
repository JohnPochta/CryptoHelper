import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptocurencySelectorA from '../CryptocurencySelectorA.js';
import AnalizatorTable from './AnalizatorTable.js';


class AnalizatorBlock extends Component {
  GetInfo(){
    /*const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/info")
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.PAIRS_SELECT(respJSON));*/
  }
  render() {
    //this.GetInfo();
  	return(
  		<div>
  			<CryptocurencySelectorA />
        <AnalizatorTable />
  		</div>
  	)
  }
};

export default connect(
	state => ({
	}),
	dispatch => ({
	})
)(AnalizatorBlock);