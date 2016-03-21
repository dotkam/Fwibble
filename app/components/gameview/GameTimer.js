var React = require('react');
var ReactDOM = require('react-dom');

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
  //sets interval to one second again
  startTimer: function() {
  	if (!this.interval) {
      this.interval = setInterval(this.tick, 1000);
    }
  },
  //normal tick of one second
  tick: function() {
    if (this.state.secondsElapsed > 0){
      this.setState({secondsElapsed: this.state.secondsElapsed - 1});
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
      <div className='gameTimer'>
      Seconds Elapsed: {this.state.secondsElapsed}
      </div>
    );
  }
});

