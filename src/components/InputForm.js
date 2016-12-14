import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import request from 'superagent';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {inputFile: '', width: '', height: ''};

    this.handleImage  = this.handleImage.bind(this);
    this.handleWidth  = this.handleWidth.bind(this);
    this.handleHeight = this.handleHeight.bind(this);
    this.submitForm   = this.submitForm.bind(this);
  }

  handleImage(e) {
    console.log('Selected file:', e.target.files[0]);
    this.setState({inputFile: e.target.files[0]});
  }

  handleWidth(e) {
    this.setState({width: e.target.value});
  }

  handleHeight(e) {
    this.setState({height: e.target.value});
  }

  submitForm(e) {
    e.preventDefault();

    const onResize = this.props.onResize;

    request
      .post('/resize')
      .attach('inputFile', this.state.inputFile)
      .field('width', this.state.width)
      .field('height', this.state.height)
      .end(function(err, res) {
        console.log('Resized image URL: ' + res.body.url);
        onResize(res.body.url);
      })
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <FieldGroup
          id="inputFile"
          type="file"
          label="Image to Resize"
          onChange={this.handleImage}/>

        <FieldGroup
          id="width"
          type="text"
          label="Width"
          placeholder="Enter maximum image width"
          onChange={this.handleWidth}/>

        <FieldGroup
          id="height"
          type="text"
          label="Height"
          placeholder="Enter maximum image height"
          onChange={this.handleHeight}/>

        <Button type="submit" bsStyle="primary">
          Submit
        </Button>
      </form>
    );
  }
}

export default InputForm;
