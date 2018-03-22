import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'semantic-ui-react';
import GetTickerButton from './GetTickerButton.js';
import GetDepthButton from './GetDepthButton.js';
import GetTradesButton from './GetTradesButton.js';
import SelectedPairTickerField from './SelectedPairTickerField.js';
import SelectedPairDepthField from './SelectedPairDepthField.js';
import SelectedPairTradesField from './SelectedPairTradesField.js'


class SelectedPairTable extends Component {
  render() {
    /*
    let DepthField = this.PrepareDepthField(this.props.depth_statistics);
    let TradesField = this.PrepareTradesField(this.props.trades_statistics);
    */
  	return(
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <GetTickerButton />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <GetDepthButton />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <GetTradesButton />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
          <Table.Cell>
            <SelectedPairTickerField />
          </Table.Cell>
          <Table.Cell>
            <SelectedPairDepthField />
          </Table.Cell>
          <Table.Cell>
            <SelectedPairTradesField />
          </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
  	)
  }
};

export default connect(
	state => ({
    /*depth_statistics: state.PairSelect.depth_statistics,
    trades_statistics: state.PairSelect.trade_statistics,*/
	}),
	dispatch => ({
	})
)(SelectedPairTable);