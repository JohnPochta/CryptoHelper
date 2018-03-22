import React, { Component } from 'react';
import { connect } from 'react-redux';
//import FantasticTable from '../components/Manager/FantasticTable.js';
import FantasticTableContainer from '../components/Manager/FantasticTableContainer.js';

class Manager extends Component {
  GetInfo(){

  }
  render() {
    this.GetInfo();
  	return(
  		<div>
  			<FantasticTableContainer />
  		</div>
  	)
  }
};

export default connect(
	state => ({
    del : state.Fantastic_Table_Statistics.deleted_elem,
	}),
	dispatch => ({
    onSelectStats : (stats) => {
      dispatch({ type : 'SELECT_STATISTIC_TO_MANAGER_PAGE', payload : stats})
    }
	})
)(Manager);