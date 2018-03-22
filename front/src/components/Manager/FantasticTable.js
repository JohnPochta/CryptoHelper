import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Segment, Table, Button, Icon } from 'semantic-ui-react';
import SelectedPairTable from '../SelectedPairTable.js';
import GridSegment from './GridSegment.js';
import GridMenu from './GridMenu.js';


class FantasticTable extends Component {
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
  //handleItemClick = (e, { name }) => { this.props.onSelectPair(name)} /*this.setState({ activeItem: name })*/
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
  Delete_Panel_Constructor(data, t){
    let keys = Object.keys(data);
    let menu_items = [];
    keys.forEach(function (elem) {
      menu_items.push(
        <div>
        <Button onClick={() => {t.DeletePair(elem,t)}}><Icon name='delete'/></Button>
        </div>
      );
    });
    return menu_items;
  }
  Fantastic_Table_Segment_Constructor(selected_pair){
    let Info = [];
    if (selected_pair===''){
      Info.push(
        <div>
          Choose any pair to see the statistics
        </div>
      );
    }
    else{
        Info.push(
          <div>
            <SelectedPairTable />
          </div>
        );

    }
    return Info;
  }
  render() {
    //clearInterval(i);
    //console.log(i);
    //let Picture = this.Fantastic_Table_Constructor(this.props.pair_selected_list, this.props.selected_pair, this);
    //let Info = this.Fantastic_Table_Segment_Constructor(this.props.selected_pair);
    //let Delete_Panel =  this.Delete_Panel_Constructor(this.props.pair_selected_list, this);
    //const { activeItem } = this.props.selected_pair;
  	return(
  		<div>
        <Grid>
          <Grid.Column width={5}>
            <Menu fluid vertical tabular>
              <GridMenu />
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={11}>
            <Segment style={{ overflow : 'scroll' }} >
              <GridSegment />
            </Segment>
          </Grid.Column>
        </Grid>
  		</div>
  	)
  }
};

export default connect(
	state => ({
    id_of_set_interval : state.Manager_Stats.id_of_set_interval,
	}),
	dispatch => ({
	})
)(FantasticTable);