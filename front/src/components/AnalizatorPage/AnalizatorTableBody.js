import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

class AnalizatorTableBody extends Component {
  GetInfo(stats, oneofpair){
    let toReturn = [];
    let pairs = Object.keys(stats);
    pairs.forEach(function (elem) {
      if (elem.indexOf(oneofpair)){
        var buy = parseFloat(1/stats[elem].buy).toFixed(8);
        var sell = parseFloat(1/stats[elem].buy).toFixed(8);
      }
      else{
        var buy = parseFloat(stats[elem].buy).toFixed(8);
        var sell = parseFloat(stats[elem].buy).toFixed(8);
      }
      toReturn.push(
        <Table.Row className={'row_'+elem} key={elem}>
            <Table.Cell className='cell'>{elem}</Table.Cell>
            <Table.Cell className='cell'>{buy}</Table.Cell>
            <Table.Cell className='cell'>-</Table.Cell>
            <Table.Cell className='cell'>{sell}</Table.Cell>
            <Table.Cell className='cell'>-</Table.Cell>
        </Table.Row>
      )
    })
    return toReturn;
  }
  render() {
    let Body = this.GetInfo(this.props.stats, this.props.one_of_pair);
    return(
       <Table.Body>
        {Body}
      </Table.Body>
    )
  }
};

export default connect(
  state => ({
    stats : state.AnalizatorTable.stats,
    one_of_pair: state.AnalizatorInfo.oneofpair,
  }),
  dispatch => ({
  })
)(AnalizatorTableBody);