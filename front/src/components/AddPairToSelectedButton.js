import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class AddPairToSelectedButton extends Component {
  Brancher(data){
    if (data.status==='OK'){
      this.props.Add2SelectedResponse(1);
    }
    else{
      this.props.history.push('/');
    }
  }
  Add(name){
    let new_ = JSON.stringify({name : name});
    fetch('client/add_new_pair', {
    method: 'POST',
    credentials: "same-origin",
    headers: {
      "Content-Type" : "application/json"
    },
      body: new_
    })
    .then(data => data.json())
    .then(data => this.Brancher(data))
    .catch(function (error) {
    console.log('Request failed', error);
    });
  }
  render() {
    var verdict = true;
    var inscription = 'Add this pair';
    if (this.props.selected_pair!==''){
      verdict = false;
    };
    if (this.props.pair_already_added){
      inscription = 'This pair already Added';
      verdict = true;
    }
  	return(
      <Button onClick={ (e) => {this.Add(this.props.selected_pair)}} disabled={verdict} positive>{inscription}</Button>
  	)
  }
};

export default connect(
	state => ({
    selected_pair : state.PairSelect.pair,
    pair_already_added : state.PairSelect.pair_already_added,
	}),
	dispatch => ({
    Add2SelectedResponse : (verdict) => {
      dispatch({ type : 'IS_PAIR_ADDED_RESPONSE', payload : verdict})
    }
	})
)(AddPairToSelectedButton);