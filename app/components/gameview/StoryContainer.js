var React = require('react');
var ReactDOM = require('react-dom');

var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');
var WordCountMeter = require('./WordCountMeter.js');
var GoButton = require('./GoButton.js');
var GameTimer = require('./GameTimer.js')

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({
  getInitialState: function() {
    return{wordCount:0}
  },

  updateWordCount: function(count) {
    this.setState({wordCount: count})
  },

  render: function() {
    console.log('myTurn', this.props.myTurn)

    var inputForm = this.props.myTurn ? (<StoryInput onFwibSubmit={this.props.onFwibSubmit} user={this.props.user} updateWordCount={this.updateWordCount} />) : null;
    var wordMeter = this.props.myTurn ? (<WordCountMeter onFwibSubmit={this.props.onFwibSubmit} user={this.props.user} wordCount={this.state.wordCount} />) : null;
    console.log('afterMyTirn', this.props.myTurn)

    return (
      <div>
        <div className="col-md-12">
          <StoryBox fwibs={this.props.fwibs} />
          <br />
          {inputForm}
          <br />
          {wordMeter}
          <br />
          <GameTimer active_game={this.props.active_game} user={this.props.user} />
        </div>
      </div>
    )
  }
});

