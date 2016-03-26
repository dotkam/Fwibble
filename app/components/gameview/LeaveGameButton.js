var React = require('react');
var ReactDOM = require('react-dom');
var GoButton = require('./GoButton.js');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({

  render: function() {

    // var display = this.props.showStory ? (<StoryContainer fwibs={this.props.fwibs} onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;

    return(
      <div className="col-md-9 col-sm-12 col-xs-12 col-lg-9">
        <br />
        <div className="text-center">
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.leaveGame}>Leave Game</button>
        </div>
      </div>
    );
  }
});