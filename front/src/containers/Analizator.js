import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react';
import AnalizatorBlock from '../components/AnalizatorPage/AnalizatorBlock.js';
import Menu from '../components/Menu.js';
import AddORDelete from '../components/AnalizatorPage/AddORDelete.js';

class Analizator extends Component {

  handleClickAOD = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexAOD = this.props.activeIndexAOD
    const newIndex = activeIndexAOD === index ? -1 : index;
    this.props.onChooseAOD(newIndex)
  }
  handleClickAB = (e, titleProps) => {
    const { index } = titleProps
    const activeIndexAB = this.props.activeIndexAB
    const newIndex = activeIndexAB === index ? -1 : index
    this.props.onChooseAB(newIndex)
  }
  render() {
  	return(
  		<div>
        <Menu />
        <Accordion fluid styled>
        <Accordion.Title active={this.props.activeIndexAOD === 0} index={0} onClick={this.handleClickAOD}>
        <Icon name='dropdown' />
          Add or Delete some pairs
        </Accordion.Title>
        <Accordion.Content active={this.props.activeIndexAOD === 0}>
          <AddORDelete />
        </Accordion.Content>
        <Accordion.Title active={this.props.activeIndexAB === 1} index={1} onClick={this.handleClickAB}>
        <Icon name='dropdown' />
          Analizator Table will help you don't lost dollar value of your transanctions
        </Accordion.Title>
        <Accordion.Content active={this.props.activeIndexAB === 1}>
          <AnalizatorBlock />
        </Accordion.Content>
        </Accordion>
  		</div>
  	)
  }
};

export default connect(
	state => ({
    activeIndexAOD : state.AccordionState.activeIndexAOD,
    activeIndexAB : state.AccordionState.activeIndexAB,


	}),
	dispatch => ({
    onChooseAOD : (info) => {
      dispatch({ type : 'ACCORDION_CHOOSE_AOD', payload : info})
    },
    onChooseAB : (info) => {
      dispatch({ type : 'ACCORDION_CHOOSE_AB', payload : info})
    },
	})
)(Analizator);