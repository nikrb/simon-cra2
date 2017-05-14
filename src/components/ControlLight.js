import React from 'react';

// FIXME: do we need to derive this from react component?
export default class ControlButton extends React.Component {
  render(){
    let button_style = {...this.props.controlStyle,
      width: "2%",
      cursor: "pointer",
      position: "absolute",
      zIndex: "105"
    };
    const {lightOn, lightSrcOn, lightSrcOff} = this.props;
    return (
      <img src={lightOn ? lightSrcOn : lightSrcOff} style={button_style} alt="no pic" />
    );
  }
}
