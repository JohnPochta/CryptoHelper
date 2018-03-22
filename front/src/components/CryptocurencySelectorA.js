import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Dropdown } from 'semantic-ui-react';

class CryptocurencySelector extends Component {
  PreparePairsToSelector(list_of_pairs){
    let set_of_cryptocurencies = new Set();
    let list_of_cryptocurencies = [];
    //let pairs_name = Object.keys(list_of_pairs);
    list_of_pairs.forEach(
      function(elem){
        elem.split('_').forEach(function(elem){set_of_cryptocurencies.add(elem)});
      }
    );
    list_of_cryptocurencies.push({
      key: '',
      value: '',
      text: 'Enter one of Cryptocurency'
    });
    set_of_cryptocurencies.forEach(function(elem){
      list_of_cryptocurencies.push({key: elem, value: elem, text: elem.toUpperCase()});
    });
    return list_of_cryptocurencies;
  }
  ChangeHandler(value){
    this.props.onSelectOneOfPair(value);
  }
  render() {
    let Cryptocurencies = this.PreparePairsToSelector(this.props.list_of_selected_pairs);
  	return(
      <Dropdown placeholder='Enter one of Cryptocurency' onChange={ (e, { value }) => {this.ChangeHandler(value)}} search selection options={Cryptocurencies} />
  	)
  }
};
export default connect(
	state => ({
    list_of_selected_pairs: state.Info.selected_pairs,
	}),
	dispatch => ({
    onSelectOneOfPair : (choose) => {
      dispatch({ type : 'SELECT_ONE_OF_PAIR_A', payload : choose})
    }
	})
)(CryptocurencySelector);