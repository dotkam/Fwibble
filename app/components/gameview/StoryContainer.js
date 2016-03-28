var React = require('react');
var ReactDOM = require('react-dom');

var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');

var GoButton = require('./GoButton.js');
var GameTimer = require('./GameTimer.js')

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({
  render: function() {
    console.log('myTurn', this.props.myTurn)

    var inputForm = this.props.myTurn && this.props.gameState === 'in progress' ? (<StoryInput onFwibSubmit={this.props.onFwibSubmit} user={this.props.user} />) : null;
    console.log('afterMyTurn', this.props.myTurn)

    return (
      <div>
        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
          <StoryBox fwibs={this.props.fwibs} />
          <br />
          {inputForm}
          <GameTimer active_game={this.props.active_game} user={this.props.user} />
        </div>
      </div>
    )
  }
});

