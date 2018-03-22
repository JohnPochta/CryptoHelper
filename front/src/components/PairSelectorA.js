import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Dropdown } from 'semantic-ui-react';

class PairSelectorA extends Component {
  PreparePairsToSelector(list_of_pairs, one_of_pair){
    let pairs = [];
    let pairs_name = Object.keys(list_of_pairs);
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
  ChangeHandler(value){
    this.props.onSelectPair(value);
  }
  render() {
    var verdict = true;
    if (this.props.one_of_pair!=''){
      verdict = false;
    }
    let Pairs = this.PreparePairsToSelector(this.props.list_of_selected_pairs, this.props.one_of_pair);
  	return(
      <Dropdown disabled={verdict} placeholder='Start to type the pair' onChange={ (e, { value }) => {this.ChangeHandler(value)}} search selection options={Pairs} />
  	)
  }
};

export default connect(
	state => ({
    one_of_pair: state.AnalizatorInfo.oneofpair,
    list_of_selected_pairs: state.Info.selected_pairs,
	}),
	dispatch => ({
    onSelectPair : (choose) => {
      dispatch({ type : 'SELECT_PAIR_A', payload : choose})
    },
	})
)(PairSelectorA);