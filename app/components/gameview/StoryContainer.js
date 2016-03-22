var React = require('react');
var ReactDOM = require('react-dom');

var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');
var WordCountMeter = require('./WordCountMeter.js');
var GoButton = require('./GoButton.js');
var LeaveGameButton = require('./LeaveGameButton.js');
var GameTimer = require('./GameTimer.js')

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({

  render: function() {
  
    var inputForm = this.props.myTurn ? (<StoryInput onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;
    var wordMeter = this.props.myTurn ? (<WordCountMeter onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <StoryBox fwibs={this.props.fwibs} />
            <br />
            {inputForm}
            <br />
            {wordMeter}
            <br />
            <LeaveGameButton />
          </div>
        </div>
        <div>
          <GameTimer active_game={this.props.active_game} user={this.props.user} />
        </div>
      </div>
    )
  }
});

