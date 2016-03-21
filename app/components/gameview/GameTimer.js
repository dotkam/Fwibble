var React = require('react');
var ReactDOM = require('react-dom');

var StoryInput = require('./StoryInput.js');
var GoButton = require('./GoButton.js');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({

  getInitialState: function() {
    return {secondsElapsed: 600};
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  startTimer: function() {
  	if (!this.interval) {
      this.interval = setInterval(this.update, this.props.options.delay); // 100 is delay
    }
  },

  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed - 1});
  },

  pauseTimer: function() {
  	 if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }

  },

  endTimer: function() {

  },

  render: function() {
  	return (
      <div className='gameTimer'>
      Seconds Elapsed: {this.state.secondsElapsed}
      </div>
    );
  }
});

