import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Segment, Table, Button, Icon } from 'semantic-ui-react';
import SelectedPairTable from '../SelectedPairTable.js';

class GridSegment extends Component {
  //state = { activeItem: 'none' };
  DeletePair(elem){
    let delete_ = JSON.stringify({name : elem});
    fetch('/delete_pair', {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json"
    },
      body: delete_
    })
    .then(this.props.onDeleteMessage(elem))
    .then(localStorage.setItem("d", JSON.stringify(1)));
    /*.then(function (data) {
      console.log('Request succeeded with JSON response', data);
      this.props.onDeleteMessage(elem);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });*/
  }
  Fantastic_Table_Segment_Constructor(selected_pair){
    let Info = [];
    if (selected_pair===''){
      Info.push(
        <div>
          Choose any pair to see the statistics
        </div>
      );
    }
    //{"ОДИН ХУЙ ВСІ СВОЇ"+' '+selected_pair+' '+"ПРОЇбеш на ПАРІ-Матч =)))0"}
    else{
        Info.push(
          <div>
            <SelectedPairTable />
          </div>
        );

    }
    return Info;
  }
  render() {
    let Info = this.Fantastic_Table_Segment_Constructor(this.props.selected_pair);
    //let Delete_Panel =  this.Delete_Panel_Constructor(this.props.pair_selected_list, this);
    var verdict = 'hidden';
    if (this.props.selected_pair!==''){
    	verdict = 'visible';
    }
  	return(
  		<div>
            {Info}
            <center><Button style={{visibility: verdict}} negative onClick={ (e) => {this.DeletePair(this.props.selected_pair)} }>Delete this pair from Selected</Button></center>
  		</div>
  	)
  }
};

export default connect(
	state => ({
    selected_pair : state.PairSelect.pair
	}),
	dispatch => ({
	    onDeleteMessage : (elem) => {
	      dispatch({ type : 'DELETE_MESSAGE', payload : elem})
	    }
	})
)(GridSegment);