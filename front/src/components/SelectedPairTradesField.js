import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Icon, Menu } from 'semantic-ui-react';

class SelectedPairTradesField extends Component {
  state = { activeItem : '1' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  PrepareTradesField(stat){
    let table = [];
    let obj = stat[this.props.selected_pair];
    if (obj !== undefined){
      obj.slice((parseInt(this.state.activeItem,10)-1)*7,(parseInt(this.state.activeItem,10)*7)).forEach(function (elem) {
        table.push(
          <Table.Row>
            <Table.Cell>{elem.type}</Table.Cell>
            <Table.Cell>{elem.price}</Table.Cell>
            <Table.Cell>{elem.amount}</Table.Cell>
          </Table.Row>
        );
      });
    }
    return table;
  }
  render() {
    let TradesField = this.PrepareTradesField(this.props.trades_statistics);
  	return(
        <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
          {TradesField}
          <Table.Row>
            <Table.Cell colSpan='3'>
            <center>
            <Menu pagination>
            <Menu.Item name='1' active={this.state.activeItem === '1'} onClick={this.handleItemClick} />
            <Menu.Item name='2' active={this.state.activeItem === '2'} onClick={this.handleItemClick} />
            <Menu.Item name='3' active={this.state.activeItem === '3'} onClick={this.handleItemClick} />
            <Menu.Item name='4' active={this.state.activeItem === '4'} onClick={this.handleItemClick} />
            <Menu.Item name='5' active={this.state.activeItem === '5'} onClick={this.handleItemClick} />
            </Menu>
            </center>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
  	)
  }
};

export default connect(
	state => ({
    trades_statistics: state.PairSelect.trades_statistics,
    selected_pair : state.PairSelect.pair
	}),
	dispatch => ({
	})
)(SelectedPairTradesField);