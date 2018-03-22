import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptocurencySelector from '../CryptocurencySelector.js';
import PairSelector from '../PairSelector.js';
import AddPairToSelectedButton from '../AddPairToSelectedButton.js';
import DeleteButton from './DeleteButton.js';


class AddORDelete extends Component {
  Brancher(data){
    if (data.status==='Wrong'){
      this.props.history.push('/');
    }
    else{
      this.props.PAIRS_SELECT(data.pairs);
    }
  }
  GetInfo(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl+"https://yobit.net/api/3/info")
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(respJSON => this.props.onSelectInfo(respJSON.pairs));
  }
  Get(){
    fetch('/client/selected_pairs', {credentials: "same-origin"})
    .then(resp => resp.json())
    .then(respJSON => JSON.stringify(respJSON))
    .then(respJSON => JSON.parse(respJSON))
    .then(data => this.Brancher(data))
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
  render() {
    console.log('bleaaat',this.props.list_of_pairs[0]);
    if ((this.props.already)){
      this.props.ALREADY(0);
      this.GetInfo();
    }
    this.Get();
  	return(
  		<div>
  			<CryptocurencySelector />
        <PairSelector />
        <AddPairToSelectedButton />
        <DeleteButton />
  		</div>
  	)
  }
};

export default connect(
	state => ({
    list_of_pairs: state.Info.info,
    pair_already_added : state.PairSelect.pair_already_added,
    already : state.Info.already,
	}),
	dispatch => ({
    onSelectInfo : (info) => {
      dispatch({ type : 'SELECT_INFO', payload : info})
    },
    PAIRS_SELECT : (choose) => {
      dispatch({ type : 'SELECT_SELECTED_PAIRS', payload : choose})
    },
    ALREADY : (choose) => {
      dispatch({ type : 'ALREADY_INFO', payload : choose})
    },
	})
)(AddORDelete);