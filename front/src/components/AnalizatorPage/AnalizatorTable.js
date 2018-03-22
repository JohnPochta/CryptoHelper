import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import AnalizatorTableBody from './AnalizatorTableBody.js';
import AnalizatorTableHeader from './AnalizatorTableHeader.js';

class AnalizatorTable extends Component {
  GetInfo(list_of_pairs, one_of_pair){
    let pairs = [];
    /*let pairs_name = Object.keys(list_of_pairs);
    if (one_of_pair==='usd'){
      pairs_name=['btc_usd','waves_usd', 'b2x_usd', 'eth_usd', 'usd_rur', 'doge_usd'];
    }
    else if (one_of_pair==='btc'){
      pairs_name=['btc_usd','waves_btc', 'b2x_btc', 'eth_btc', 'btc_rur', 'doge_btc'];
    }*/
    list_of_pairs.forEach(function(elem){
      if (elem.indexOf(one_of_pair)!==-1){
        let flag = 0;
        elem.split('_').forEach(function(cc){if (cc===one_of_pair) {flag=1} });
        if (flag){
          pairs.push({
            name: elem
          });
        }
      }
    });
    let query_string = '';
    if (pairs.length<=100){
      pairs.forEach(function (elem) {
        query_string+=elem.name;
        query_string+='-';
      });
      if (query_string!==''){
        /*var myHeaders = new Headers();
        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };*/
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl+"https://yobit.net/api/3/ticker/"+query_string.slice(0, -1))
        .then(resp => resp.json())
        .then(respJSON => JSON.stringify(respJSON))
        .then(respJSON => JSON.parse(respJSON))
        .then(respJSON => this.props.onSelectStats(respJSON));
      }
    }
    else{
      var ObjectResponse = new Object;
      let count = parseInt(pairs.length/50);
      for (var i = 0; i <= count; i++) {
        var response = [];
        let query_string = '';
        pairs.slice(i*50,(i+1)*50).forEach(function(elem){
          query_string+=elem.name;
          query_string+='-';
        });
        if (query_string!==''){
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          fetch(proxyurl+"https://yobit.net/api/3/ticker/"+query_string.slice(0, -1))
          .then(resp => resp.json())
          .then(respJSON => JSON.stringify(respJSON))
          .then(respJSON => JSON.parse(respJSON))
          .then(respJSON => this.props.onSelectPieceofStats(respJSON));
        };
        //console.log(query_string);
      };
    }
  }
  render() {
    //setTimeout(this.GetInfo, 60000);
    function setIntervalAndExecute(fn, t) {
      fn();
      return(setInterval(fn, t));
    }
    clearInterval(JSON.parse(localStorage.getItem("sI")));
    var i = setIntervalAndExecute( () => {this.GetInfo(this.props.list_of_pairs, this.props.one_of_pair)}, 30000);
    localStorage.setItem("sI", JSON.stringify(i));
    return(
      <div>
        <Table celled structured>
          <AnalizatorTableHeader one_of_pair={this.props.one_of_pair} />
          <AnalizatorTableBody />
        </Table>
      </div>
    )
  }
};

export default connect(
  state => ({
    list_of_pairs: state.Info.selected_pairs,
    one_of_pair: state.AnalizatorInfo.oneofpair,
  }),
  dispatch => ({
    onSelectStats : (stats) => {
      dispatch({ type : 'SELECT_STATISTIC_TO_ANALIZATOR_TABLE', payload : stats})
    },
    onSelectPieceofStats : (stats) => {
      dispatch({ type : 'SELECT_PIECE_OF_STATISTIC_TO_ANALIZATOR_TABLE', payload : stats})
    },
  })
)(AnalizatorTable);