import React from 'react';

export default class ControlCounter extends React.Component {
  state = {
    display_error: ""
  };
  oopsSound = null;
  flash_count = 0;
  flash_visible = false;
  show_error = false;
  componentWillMount = () => {
    this.oopsSound = new Audio( this.props.sound);
    this.oopsSound.volume = 0.2;
  };
  playOopsSound = () =>{
    this.oopsSound.currentTime = 0;
    this.oopsSound.play();
  };
  startFlashError = () =>{
    this.show_error = true;
    this.flash_error = 4;
    this.flash_visible = false;
    this.playOopsSound();
    this.flashError();
  };
  flashError = () => {
    if( this.flash_error > 0){
      this.flash_error -= 1;
      if( this.flash_visible){
        this.flash_visible = false;
        this.setState( { display_error: ""});
        setTimeout( this.flashError, 300);
      } else {
        this.flash_visible = true;
        this.setState( { display_error: "!!"});
        setTimeout( this.flashError, 500);
      }
    } else {
      // TODO: maybe sync this call to end of mistake sound
      this.show_error = false;
      this.props.errorDisplayFinished();
    }
  };

  render = () => {
    let style = {...this.props.controlStyle,
      color: "red",
      position: "absolute",
      zIndex: "105"
    };
    if( this.props.show_error && !this.show_error){
      this.startFlashError();
    }
    return (
      <span style={style}>{ this.show_error ? this.state.display_error : this.props.display_count}</span>
    );
  };
}
