import React from 'react';
import './App.css';

import Pad from './components/Pad';
import ControlButton from './components/ControlButton';
import ControlLight from './components/ControlLight';
import ControlCounter from './components/ControlCounter';
import * as img from './img';

class App extends React.Component {
  state = {
    pads_enabled : false,
    strict_mode : false,
    display_count : "--",
    show_error : false
  };
  // max sequence length, win condition
  full_sequence_length = 20;
  // the current sequence the user is following, 1 to full_sequence_length
  current_sequence_length = 1;
  // current sequence user has to copy to get right
  current_sequence = [];
  // keeps track of current sequence element for playback and user guesses
  current_sequence_ndx = 0;
  pads = [];

  componentWillMount = () => {
  };
  generateSequence = () => {
    let seq = [];
    for( let i=0; i<this.full_sequence_length; i++){
      seq.push( parseInt( Math.random()*4, 10));
    }
    return seq;
  };
  // start sequence playback
  startSequencePlayback = () => {
    this.current_sequence_ndx = 0;
    this.setState( { pads_enabled : false});
    this.nextSequence();
  };
  // light up next colour pad in sequence
  nextSequence = () => {
    const colour_ndx = this.current_sequence[this.current_sequence_ndx];
    this.pads[colour_ndx].play();
    setTimeout( this.turnPadOff, 700);
  };
  // turn pad light off then move to next after a short delay
  turnPadOff = () => {
    const colour_ndx = this.current_sequence[this.current_sequence_ndx];
    this.pads[colour_ndx].stop();
    this.current_sequence_ndx += 1;
    if( this.current_sequence_ndx < this.current_sequence_length){
      setTimeout( this.nextSequence, 250);
    } else {
      // sequence playback finished so zero sequence ready for user guesses
      this.current_sequence_ndx = 0;
      this.setState( { pads_enabled : true});
    }
  };
  showWinDlg = () => {
    alert( "You Won!");
  };
  errorFinished = () => {
    if( this.state.strict_mode){
      this.startFreshSequence();
    } else {
      setTimeout( this.startNextSequence, 250);
    }
  };

  // TODO: this should be padRelease
  padClick = (ndx) => {
    // FIXME: we shouldn't need this
    if( this.state.pads_enabled){
      if( this.current_sequence[this.current_sequence_ndx] === ndx){
        this.current_sequence_ndx += 1;
        if( this.current_sequence_ndx >= this.current_sequence_length){
          this.setState( { pads_enabled : false});
          this.current_sequence_length += 1;
          if( this.current_sequence_length < this.full_sequence_length){
            // give the user a moment before next sequence starts
            setTimeout( this.startNextSequence, 500);
          } else {
            setTimeout( this.showWinDlg, 100);
          }
        }
      } else {
        this.setState( { pads_enabled: false, show_error: true});
      }
    }
  };

  // start next sequence of pad colours
  startNextSequence = () => {
    this.setState( { display_count: ""+this.current_sequence_length});
    setTimeout( this.startSequencePlayback, 500);
  };
  startClicked = (e) => {
    console.log( "start button clicked");
    this.startFreshSequence();
  };
  startFreshSequence = () => {
    this.current_sequence = this.generateSequence();
    console.log( "sequence:", this.current_sequence);
    this.current_sequence_length = 1;
    this.startNextSequence();
  };
  strictClicked = (e) => {
    const on = !this.state.strict_mode;
    this.setState( { strict_mode : on});
  };
  render = () => {
    const container = {
      position: "absolute"
    };
    return (
      <div className="App">
        <div style={container}>
          <img src={img.simonBase} alt="no pic" />
          <Pad sound="//s3.amazonaws.com/freecodecamp/simonSound1.mp3"
            padStyle={{top:"0", left:"0"}} padNdx={0} padClick={this.padClick}
            padEnabled={this.state.pads_enabled}
            padSrcDull={img.padGreenDull} padSrcBright={img.padGreenBright} />
          <Pad sound="//s3.amazonaws.com/freecodecamp/simonSound2.mp3"
            padStyle={{top:"0", left:"50%"}} padNdx={1} padClick={this.padClick}
            padEnabled={this.state.pads_enabled}
            padSrcDull={img.padRedDull} padSrcBright={img.padRedBright}/>
          <Pad sound="//s3.amazonaws.com/freecodecamp/simonSound3.mp3"
            padStyle={{top:"50%", left:"0"}} padNdx={2} padClick={this.padClick}
            padEnabled={this.state.pads_enabled}
            padSrcDull={img.padYellowDull} padSrcBright={img.padYellowBright} />
          <Pad sound="//s3.amazonaws.com/freecodecamp/simonSound4.mp3"
            padStyle={{top:"50%", left:"50%"}} padNdx={3} padClick={this.padClick}
            padEnabled={this.state.pads_enabled}
            padSrcDull={img.padBlueDull} padSrcBright={img.padBlueBright}/>
          <ControlButton buttonStyle={{top:"53%", left:"48.5%"}} clicked={this.startClicked}
            buttonSrc={img.buttonRed} />
          <ControlButton buttonStyle={{ top:"53%", left:"60%"}} clicked={this.strictClicked}
            buttonSrc={img.buttonYellow} />
          <ControlLight  controlStyle={{top:"50%", left:"61.5%"}}
            lightOn={this.state.strict_mode}
            lightSrcOff={img.buttonYellow} lightSrcOn={img.buttonRed} />
          <ControlCounter errorDisplayFinished={this.errorFinished}
            sound="./audio/wrong.mp3"  show_error={this.state.display_error}
            controlStyle={{ top:"53%", left:"38%"}} display_count={this.state.display_count} />
        </div>
      </div>
    );
  };
}

export default App;
