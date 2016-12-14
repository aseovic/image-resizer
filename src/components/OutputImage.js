import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class OutputImage extends Component {
  render() {
    const url = this.props.url;
    return url
      ? (<Image src={url}/>)
      : (<div/>);
  }
}

export default OutputImage;
