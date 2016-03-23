var React = require('react');
var ReactDOM = require('react-dom');
var GoButton = require('./GoButton.js');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({

  render: function() {

    // var display = this.props.showStory ? (<StoryContainer fwibs={this.props.fwibs} onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;

    return(
      <div className="col-md-9">
        <button type="button" className="btn btn-primary btn-md" onClick={this.props.leaveGame}>Leave Game</button>
      </div>
    );
  }
});