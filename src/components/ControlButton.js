import React from 'react';

export default class ControlButton extends React.Component {
  state = {
    pressed: false
  };
  mouseDown = (e) => {
    this.setState( { pressed : true});
  };
  mouseRelease = (e) => {
    this.setState( { pressed: false});
    this.props.clicked( e);
  };
  render = () => {
    const box = this.state.pressed? "0px 0px 0px #888888" : "0px 2px 5px #888888";
    let button_style = {...this.props.button_style,
      borderRadius: "100%",
      boxShadow: box,
      width: "5%",
      cursor: "pointer",
      position: "absolute",
      zIndex: "105"
    };
    return (
      <img src={this.props.buttonSrc} onMouseDown={this.mouseDown}
        onMouseUp={this.mouseRelease} style={button_style} alt="no pic" />
    );
  };
}
