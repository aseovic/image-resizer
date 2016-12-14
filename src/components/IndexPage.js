import React, { Component } from 'react';
import { Panel, PageHeader } from 'react-bootstrap';
import InputForm from './InputForm';
import OutputImage from './OutputImage';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {resizedUrl: ''};

    this.onResize = this.onResize.bind(this);
  }

  onResize(url) {
    this.setState({resizedUrl: url});
  }

  render() {
    const formTitle = (<h3>Upload the file to resize, and choose output options</h3>);
    const outputTitle = (<h3>Resized Image</h3>);

    return (
      <div>
        <PageHeader>Image Resizer</PageHeader>
        <Panel header={formTitle} bsStyle="primary">
          <InputForm onResize={this.onResize}/>
        </Panel>
        <Panel header={outputTitle} bsStyle="info">
          <OutputImage url={this.state.resizedUrl}/>
        </Panel>
      </div>
    );
  }
}

export default IndexPage;
