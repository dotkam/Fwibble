var React = require('react');
var ReactDOM = require('react-dom');
var GoButton = require('./GoButton.js');

module.exports = React.createClass({

leaveGame: function() {
  // on clicking leave room button, 
  // change game state from active to ?????

},


  render: function() {

    // var display = this.props.showStory ? (<StoryContainer fwibs={this.props.fwibs} onFwibSubmit={this.handleFwibSubmit} user={this.props.user} />) : null;

    return(
      <div className="col-md-9">
        <button type="button" className="btn btn-primary btn-md" onClick={this.leaveGame}>Leave Game</button>
      </div>
    );
  }
});