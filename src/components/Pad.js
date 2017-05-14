import React from 'react';
import {getTransparencyAtXY} from "./Utils";

export default class Pad extends React.Component {
  state = {
    litup: false
  };
  play = () => {
    this.setBright( true);
    this.props.sound.currentTime = 0;
    this.props.sound.play();
  };
  stop = () => {
    this.setBright( false);
    this.props.sound.pause();
  };
  setBright = ( bright) => {
    this.setState( { litup : bright});
  };
  padClicked = (e) => {
    const alpha = getTransparencyAtXY(e);
    if( this.props.padEnabled && alpha > 0){
      this.setBright( true);
      this.sound.currentTime = 0;
      this.sound.play();
    }
  };
  padReleased = (e) => {
    const litup = this.state.litup;
    this.setBright( false);
    if( litup){
      const alpha = getTransparencyAtXY( e);
      if( alpha > 0 ){
        this.props.padClick( this.props.padNdx);
      }
    }
  };
  padLeave = (e) => {
    this.setBright( false);
  };
  render(){
    let padStyle = {...this.props.padStyle,
      cursor: "pointer",
      width: "50%",
      position: "absolute",
      zIndex: "102"
    };
    const {padSrcBright, padSrcDull} = this.props;
    return (
      <img style={padStyle} src={(this.state.litup) ? padSrcBright:padSrcDull}
          onMouseDown={this.padClicked} onMouseUp={this.padReleased}
          onMouseLeave={this.padLeave} alt="no pic" />
    );
  }
}
