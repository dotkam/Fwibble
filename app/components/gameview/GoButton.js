var React = require('react');
var ReactDOM = require('react-dom');
var GoButton = require('./GoButton.js');

module.exports = React.createClass({

startGame: function() {
  // on clicking go button, change game state from open to active
  this.props.gameStart();

  // trigger onGo function in parent component
  this.props.goButtonPush();
},


  render: function() {

    // var display = this.props.showStory ? (<StoryContainer fwibs={this.props.fwibs} onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;

    return(
      <div className="col-md-9">
        <button type="button" className="btn btn-primary btn-lg" onClick={this.startGame}>Go</button>
      </div>
    );
  }
});