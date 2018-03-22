import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

class DeleteButton extends Component {
  Brancher(data){
    if (data.status==='OK'){
      this.props.Add2SelectedResponse(0);
    }
    else{
      this.props.history.push('/');
    }
  }
  Add(name){
    let new_ = JSON.stringify({name : name});
    fetch('client/delete_pair', {
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
    var inscription = 'Delete this pair';
    if (this.props.selected_pair!==''){
      inscription = 'This pair is not exist';
      verdict = true;
    };
    if (this.props.pair_already_added){
      inscription = 'Delete this pair';
      verdict = false;
    }
  	return(
      <Button negative onClick={ (e) => {this.Add(this.props.selected_pair)}} disabled={verdict} positive>{inscription}</Button>
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
)(DeleteButton);