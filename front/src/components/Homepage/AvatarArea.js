import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Modal, Form, Checkbox, Message, Image } from 'semantic-ui-react';

class AvatarArea extends Component {
  handleItemClick = (e) => {
    const data = new FormData();
    data.append('file', this.refs.fileInput.files[0]);
    data.append('filename', this.refs.fileInput.files[0].name);
    fetch('/client/upload_avatar', {
      method: 'POST',
      credentials: "same-origin",
      body: data
      })
      .then(data => data.json())
      //.then(data => this.Brancher(data.status))
      .catch(function (error) {
      console.log('Request failed', error);
    });
  };
  render() {
    var is_form_ready;
  	return(
      <Segment.Group size='medium'>
        <Image src={this.props.src}  size='medium' />
        <Form onSubmit={this.handleItemClick}>
          <Form.Field>
            <input ref='fileInput' placeholder='smth@example.com' type='file' name="myImage" accept="image/*" />
            <Button disabled={is_form_ready} type='submit' positive icon='checkmark' labelPosition='right' content="Change Avatar!" />
          </Form.Field>
        </Form>
      </Segment.Group>
  	)
  }
};
export default connect(
	state => ({
    src : state.Menu.avatar,
	}),
	dispatch => ({
	})
)(AvatarArea);