var React = require('react');
var ReactDOM = require('react-dom');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  
  getInitialState: function() {
    return {secondsLeft: 6 };
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
      <div className='gameTimer'>Seconds Left: {this.state.secondsLeft}</div>
    );
  }
});

