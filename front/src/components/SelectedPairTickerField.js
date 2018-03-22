import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'semantic-ui-react';

class SelectedPairTickerField extends Component {
  PrepareTicketField(stat){
    let table = [];
    let obj = stat[this.props.selected_pair];
    if (obj !== undefined){
      let lines = Object.keys(obj);
      lines.forEach(function (elem) {
        table.push(
          <Table.Row>
            <Table.Cell>{elem}</Table.Cell>
            <Table.Cell>{obj[elem]}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return table;
  }
  render() {
    let TickerField = this.PrepareTicketField(this.props.ticker_statistics);
  	return(
      <Table celled>
        <Table.Body>
          {TickerField}
        </Table.Body>
      </Table>
  	)
  }
};

export default connect(
	state => ({
    ticker_statistics: state.PairSelect.ticker_statistics,
    selected_pair : state.PairSelect.pair
	}),
	dispatch => ({
	})
)(SelectedPairTickerField);