import React, { Component } from 'react';
import { connect } from 'react-redux';
import FantasticTable from './FantasticTable.js';

class FantasticTableContainer extends Component {
  GetInfo(){
    let query_string = '';
    this.props.pair_selected_list.forEach(function (elem) {
      query_string+=elem.name;
      query_string+='-';
    });
    if (query_string!==''){
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      function setIntervalAndExecute(fn, t) {
          fn();
          return(setInterval(fn, t));
      }
      /*console.log(this.props.id_of_set_interval);
      if (this.props.id_of_set_interval!==''){
        clearInterval(this.props.id_of_set_interval);
      }*/
      let i = setIntervalAndExecute( () => {fetch(proxyurl+"https://yobit.net/api/3/ticker/"+query_string.slice(0, -1))
      .then(resp => resp.json())
      .then(respJSON => JSON.stringify(respJSON))
      .then(respJSON => JSON.parse(respJSON))
      .then(respJSON => this.props.onSelectStats(respJSON))}, 60000);
    }
  }
  render() {
    this.GetInfo();
  	return(
  		<div>
        <FantasticTable />
  		</div>
  	)
  }
};

export default connect(
	state => ({
    pair_selected_list : state.Manager_Stats.stats,
	}),
	dispatch => ({
    onSelectStats : (stats) => {
      dispatch({ type : 'SELECT_STATISTIC_TO_FANTASTIC_TABLE', payload : stats})
    },
    New_Interval : (id) => {
      dispatch({type : 'NEW_INTERVAL', payload : id})
    }
	})
)(FantasticTableContainer);