import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkSpace extends Component {
  Brancher(data){
    if (data.status==='Wrong'){
      this.props.history.push('/');
    }
    else{
    }
  }
  GetInfo(){
    fetch('/client/homepage', {credentials: "same-origin"})
    .then(data => data.json())
    .then(data => this.Brancher(data))
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
  render() {
    this.GetInfo();
  	return(
  		<div>
  		</div>
  	)
  }
};

export default connect(
	state => ({
	}),
	dispatch => ({
	})
)(WorkSpace);