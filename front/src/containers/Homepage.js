import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import Menu_ from '../components/Menu.js';
import CryptocurencySelector from '../components/CryptocurencySelector.js';
import AvatarArea from '../components/Homepage/AvatarArea.js';


class Homepage extends Component {
  httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }
  render() {
    console.log(this.httpGet('https://cors-anywhere.herokuapp.com/https://twitter.com/realDonaldTrump'));
  	return(
  		<div>
        <Menu_ />
        <AvatarArea />
  		</div>
  	)
  }
};

export default connect(
	state => ({
	}),
	dispatch => ({
    onSelectInfo : (info) => {
      dispatch({ type : 'SELECT_INFO', payload : info})
    }
	})
)(Homepage);