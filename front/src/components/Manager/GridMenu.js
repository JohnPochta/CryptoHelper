import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Segment, Table, Button, Icon } from 'semantic-ui-react';


class GridMenu extends Component {
  //state = { activeItem: 'none' };
  DeletePair(elem,t){
    let delete_ = JSON.stringify({name : elem});
    fetch('/delete_pair', {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json"
    },
      body: delete_
    })
    .then(this.props.onDeleteMessage(elem));
    /*.then(function (data) {
      console.log('Request succeeded with JSON response', data);
      this.props.onDeleteMessage(elem);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });*/
  }
  handleItemClick = (e, { name }) => { this.props.onSelectPair(name)} /*this.setState({ activeItem: name })*/
  Fantastic_Table_Constructor(data, activeItem, t){
    let keys = Object.keys(data);
    let menu_items = [];
    keys.forEach(function (elem) {
      menu_items.push(
        <div>
        <Menu.Item name={elem} key={elem} active={activeItem === elem} onClick={t.handleItemClick}>
          {elem+'       '+data[elem].buy+'    '+data[elem].sell}
        </Menu.Item>
        </div>
      );
    });
    return menu_items;
  }
  render() {
    let Picture = this.Fantastic_Table_Constructor(this.props.pair_selected_list, this.props.selected_pair, this);
    //let Info = this.Fantastic_Table_Segment_Constructor(this.props.selected_pair);
    //let Delete_Panel =  this.Delete_Panel_Constructor(this.props.pair_selected_list, this);
    const { activeItem } = this.props.selected_pair;
  	return(
  		<div>
        {Picture}
  		</div>
  	)
  }
};

export default connect(
	state => ({
    pair_selected_list : state.Fantastic_Table_Statistics.stats,
    selected_pair : state.PairSelect.pair
	}),
	dispatch => ({
    onSelectPair : (choose) => {
      dispatch({ type : 'SELECT_PAIR', payload : choose})
    },
    onDeleteMessage : (elem) => {
      dispatch({ type : 'DELETE_MESSAGE', payload : elem})
    }
	})
)(GridMenu);