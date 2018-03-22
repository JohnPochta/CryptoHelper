import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Icon, Menu } from 'semantic-ui-react';

class SelectedPairDepthField extends Component {
  state = { activeItemAsks: '1', activeItemBids: '1'  };
  handleItemClickAsks = (e, { name }) => this.setState({ activeItemAsks: name });
  handleItemClickBids = (e, { name }) => this.setState({ activeItemBids: name });
  PrepareAsksField(stat){
    let table = [];
    if (stat!=undefined){
      stat.asks.slice((parseInt(this.state.activeItemAsks,10)-1)*6,(parseInt(this.state.activeItemAsks,10)*6)).forEach(function(elem) {
        table.push(
          <Table.Row>
            <Table.Cell>{elem[0]}</Table.Cell>
            <Table.Cell>{elem[1]}</Table.Cell>
          </Table.Row>
        );  
      });
    };
    return table;
  }
  PrepareBidsField(stat){
    let table = [];
    if (stat!=undefined){
      stat.bids.slice((parseInt(this.state.activeItemBids,10)-1)*6,(parseInt(this.state.activeItemBids,10)*6)).forEach(function(elem) {
        table.push(
          <Table.Row>
            <Table.Cell>{elem[0]}</Table.Cell>
            <Table.Cell>{elem[1]}</Table.Cell>
          </Table.Row>
        );  
      });
    };
    return table;
  }
  render() {
    let AsksField = this.PrepareAsksField(this.props.depth_statistics[this.props.selected_pair]);
    let BidsField = this.PrepareBidsField(this.props.depth_statistics[this.props.selected_pair]);
  	return(
      <Table celled>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell>To Buy</Table.HeaderCell>
        <Table.HeaderCell>To Sell</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
        <Table.Cell>
          <Table celled>
            <Table.Body>
              {AsksField}
            </Table.Body>
          </Table>
        </Table.Cell>
        <Table.Cell>
          <Table celled>
            <Table.Body>
              {BidsField}
            </Table.Body>
          </Table>
        </Table.Cell>
        </Table.Row>
        <Table.Row>
        <Table.Cell>
          <center>
          <Menu pagination>
            <Menu.Item name='1' active={this.state.activeItemAsks === '1'} onClick={this.handleItemClickAsks} />
            <Menu.Item name='2' active={this.state.activeItemAsks === '2'} onClick={this.handleItemClickAsks} />
            <Menu.Item name='3' active={this.state.activeItemAsks === '3'} onClick={this.handleItemClickAsks} />
          </Menu>
          </center>
        </Table.Cell>
        <Table.Cell>
          <center>
          <Menu pagination>
            <Menu.Item name='1' active={this.state.activeItemBids === '1'} onClick={this.handleItemClickBids} />
            <Menu.Item name='2' active={this.state.activeItemBids === '2'} onClick={this.handleItemClickBids} />
            <Menu.Item name='3' active={this.state.activeItemBids === '3'} onClick={this.handleItemClickBids} />
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
    depth_statistics: state.PairSelect.depth_statistics,
    selected_pair : state.PairSelect.pair
	}),
	dispatch => ({
	})
)(SelectedPairDepthField);