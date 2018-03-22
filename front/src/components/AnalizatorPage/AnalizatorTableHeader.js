import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import ticker_request_yobit from '../../functions/ticker_request_yobit';

class AnalizatorTableHeader extends Component {
    GetSellInfoUSD(stats, one_of_pair){
      let array1 = [];
      let array2 = [];
      let pairs = Object.keys(stats);
      pairs.forEach(function(elem){
        if (elem.indexOf(one_of_pair)!==-1){
          if (elem.split('_').indexOf(one_of_pair)){
            array2.push({name : elem.split('_')[0]})
          }
          else{
            array1.push({name : elem.split('_')[1]})
          }
      }
    });
    function query_string_bbc_constructor(array_){
      let query_string = '';
      array_.forEach(function(elem){
      if ((elem.name!=='rur') && (elem.name!=='usd')){
          query_string+=elem.name+'_usd-';     
      }
      else if (elem.name!=='usd'){
          query_string+='usd_'+elem.name+'-';
        }
        });
        return query_string;
    }
    let query_string1 = query_string_bbc_constructor(array1).slice(0,-1);
    let query_string2 = query_string_bbc_constructor(array2).slice(0,-1);
    function array1_response(resp){
      let btc_buy_analysis = [];
      pairs = Object.keys(resp);
      pairs.forEach(function(elem){
        console.log(elem);
        if(elem.split('_').indexOf('usd')){
          btc_buy_analysis.push(
            {
              name : one_of_pair+'_'+elem.split('_')[0],
              value : (((stats[one_of_pair+'_'+elem.split('_')[0]].buy)*1.002*(resp[elem].buy)))*0.998
            }
          );
        }
        else{/*on rouble area*/
          console.log(resp.elem);
          btc_buy_analysis.push(
            {
              name : one_of_pair+'_'+elem.split('_')[1],
              value : (((stats[one_of_pair+'_'+elem.split('_')[1]].buy)*1.002)*0.998004)/(resp[elem].buy)
            }
          );
        }
      });
      btc_buy_analysis.forEach(function(elem){
        var test = document.querySelector('.row_'+elem.name);
        let wat = test.childNodes;
        wat[2].innerText=parseFloat(elem.value).toFixed(8);
      });
    };
    function array2_response(resp){
      let btc_buy_analysis = [];
      pairs = Object.keys(resp);
      pairs.forEach(function(elem){
        if(elem.split('_').indexOf('usd')){
          btc_buy_analysis.push(
            {
              name : elem.split('_')[0]+'_'+one_of_pair,
              value : ((1.002004/((stats[elem.split('_')[0]+'_'+one_of_pair].buy)))*(resp[elem].buy))*0.998
            }
          );
        }
        else{
          btc_buy_analysis.push(
            {
              name : elem.split('_')[1]+'_'+one_of_pair,
              value : ((1.002004/((stats[elem.split('_')[0]+'_'+one_of_pair].buy)))*(resp[elem].buy))*0.998
            }
          );
        }
      });
      btc_buy_analysis.forEach(function(elem){
        var test = document.querySelector('.row_'+elem.name);
        let wat = test.childNodes;
        wat[2].innerText=parseFloat(elem.value).toFixed(8);
      });
    };
    if (query_string1!==''){
      ticker_request_yobit(query_string1, array1_response);
    };
    if (query_string2!==''){
      ticker_request_yobit(query_string2, array2_response);
    };
  }
    GetBuyInfoUSD(stats, one_of_pair){
    let array1 = [];
    let array2 = [];
    let pairs = Object.keys(stats);
    pairs.forEach(function(elem){
      if (elem.indexOf(one_of_pair)!==-1){
        if (elem.split('_').indexOf(one_of_pair)){
          array2.push({name : elem.split('_')[0]})
        }
        else{
          array1.push({name : elem.split('_')[1]})
        }
      }
    });
    function query_string_bbc_constructor(array_){
      let query_string = '';
      array_.forEach(function(elem){
        if ((elem.name!=='rur') && (elem.name!=='usd')){
          query_string+=elem.name+'_usd-';     
        }
        else if (elem.name!=='usd'){
          query_string+='usd_'+elem.name+'-';
        }
      });
      return query_string;
    }
    let query_string1 = query_string_bbc_constructor(array1).slice(0,-1);
    let query_string2 = query_string_bbc_constructor(array2).slice(0,-1);
    function array1_response(resp){
      let btc_buy_analysis = [];
      pairs = Object.keys(resp);
      pairs.forEach(function(elem){
        if(elem.split('_').indexOf('usd')){
          btc_buy_analysis.push(
            {
              name : one_of_pair+'_'+elem.split('_')[0],
              value : (((stats[one_of_pair+'_'+elem.split('_')[0]].buy)*0.998)*(resp[elem].buy))*0.998
            }
          );
        }
        else{/*on rouble area*/
          /*console.log(resp[elem].buy);
          console.log('sell',resp[elem].sell);*/
          btc_buy_analysis.push(
            {
              name : one_of_pair+'_'+elem.split('_')[1],
              value : (((stats[one_of_pair+'_'+elem.split('_')[1]].buy)*0.998)*0.998004)/(resp[elem].buy)
            }
          );
        }
      });
      btc_buy_analysis.forEach(function(elem){
        var test = document.querySelector('.row_'+elem.name);
        let wat = test.childNodes;
        wat[4].innerText=parseFloat(elem.value).toFixed(8);
      });
    };
    function array2_response(resp){
      let btc_buy_analysis = [];
      pairs = Object.keys(resp);
      pairs.forEach(function(elem){
        if(elem.split('_').indexOf('usd')){
          btc_buy_analysis.push(
            {
              name : elem.split('_')[0]+'_'+one_of_pair,
              value : ((0.998004/((stats[elem.split('_')[0]+'_'+one_of_pair].buy)))*(resp[elem].buy))*0.998
            }
          );
        }
        else{
          btc_buy_analysis.push(
            {
              name : elem.split('_')[1]+'_'+one_of_pair,
              value : (0.998004/((stats[elem.split('_')[1]+'_'+one_of_pair].buy)))*((resp[elem].buy))*0.998
            }
          );
        }
      });
      btc_buy_analysis.forEach(function(elem){
        var test = document.querySelector('.row_'+elem.name);
        let wat = test.childNodes;
        wat[4].innerText=parseFloat(elem.value).toFixed(8);
      });
    };
    if (query_string1!==''){
      ticker_request_yobit(query_string1, array1_response);
    };
    if (query_string2!==''){
      ticker_request_yobit(query_string2, array2_response);
    };
  }
  render() {
    this.GetBuyInfoUSD(this.props.stats, this.props.one_of_pair );
    this.GetSellInfoUSD(this.props.stats, this.props.one_of_pair );
    return(
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='5'>{this.props.one_of_pair.toUpperCase()}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell rowSpan='2'>Name_of_pair</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>{'Купляєш '+this.props.one_of_pair}</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>{'Продаєш '+this.props.one_of_pair}</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>-</Table.HeaderCell>
          <Table.HeaderCell>{"За скільки доларів ти купиш "+this.props.one_of_pair}</Table.HeaderCell>
          <Table.HeaderCell>-</Table.HeaderCell>
          <Table.HeaderCell>{"Скільки доларів коштуватиме отримана за "+this.props.one_of_pair+" дєньга=)"}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }
};

export default connect(
  state => ({
    stats : state.AnalizatorTable.stats,
  }),
  dispatch => ({
    /*onSelectBTCAnalysis : (stats) => {
      dispatch({ type : 'SELECT_BTC_ANALYSIS', payload : stats})
    },*/
  })
)(AnalizatorTableHeader);