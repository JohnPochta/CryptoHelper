import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Dropdown } from 'semantic-ui-react';

class PairSelector extends Component {
  PreparePairsToSelector(list_of_pairs, one_of_pair){
    let pairs = [];
    let pairs_name = Object.keys(list_of_pairs.info);
    pairs.push({
      key: '',
      value: '',
      text: 'Start to type the pair'
    });
    pairs_name.forEach(function(elem){
      if (elem.indexOf(one_of_pair)!=-1){
        let flag = 0;
        elem.split('_').forEach(function(cc){if (cc===one_of_pair) {flag=1} });
        if (flag){
          pairs.push({
            key: elem,
            value: elem,
            text: elem
          });
        }
      }
    });
    return pairs;
  }
  Brancher(data){
    if (data.status==='Wrong'){
      this.props.history.push('/');
    }
    else{
      this.props.PAIRS_SELECT(data.pairs);
    }
  }
  ChangeHandler(value){
    if (this.props.list_of_selected_pairs.indexOf(value)!==-1){
      this.props.IsPairAddedResponse(1);
    }
    else{
      this.props.IsPairAddedResponse(0);
    }
    this.props.onSelectPair(value);
  }
  render() {
    var verdict = true;
    if (this.props.one_of_pair!=''){
      verdict = false;
    }
    let Pairs = this.PreparePairsToSelector(this.props.list_of_pairs, this.props.one_of_pair);
  	return(
      <Dropdown disabled={verdict} placeholder='Start to type the pair' onChange={ (e, { value }) => {this.ChangeHandler(value)}} search selection options={Pairs} />
  	)
  }
};

export default connect(
	state => ({
    list_of_pairs: state.Info,
    one_of_pair: state.PairSelect.oneofpair,
    list_of_selected_pairs: state.Info.selected_pairs,
	}),
	dispatch => ({
    onSelectPair : (choose) => {
      dispatch({ type : 'SELECT_PAIR', payload : choose})
    },
    IsPairAddedResponse : (choose) => {
      dispatch({ type : 'IS_PAIR_ADDED_RESPONSE', payload : choose})
    },
	})
)(PairSelector);