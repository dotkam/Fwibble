var React = require('react');
var ReactDOM = require('react-dom');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  
  getInitialState: function() {
    return {secondsLeft: 30 };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  //sets interval to one second again
  startTimer: function() {
  	if (!this.interval) {
      this.interval = setInterval(this.tick, 1000);
    }
  },
  //normal tick of one second
  tick: function() {
    if (this.state.secondsLeft > 0){
      this.setState({secondsLeft: this.state.secondsLeft - 1});
    } else {
      console.log('seconds have ended!', this.props.active_game, this.props.user)
      clearInterval(this.interval);    
      socket.emit('endtimer', {username: this.props.user, gamehash: this.props.active_game});
    }

    var time = this.state.secondsLeft;
    this.setState({minutes: Math.floor(time / 60)});

    var seconds = time - this.state.minutes * 60;
    function str_pad_left(string,pad,length) {
      return (new Array(length+1).join(pad)+string).slice(-length);
    }

    var prettySeconds = str_pad_left(seconds,'0',2);

    this.setState({seconds: prettySeconds});
  },
  //sets this interval to nothing, pausing timer
  pauseTimer: function() {
  	 if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  render: function() {
  	return (
      <div className='gameTimer'>Seconds Left in Game: {this.state.secondsLeft}</div>
    );
  }
});


