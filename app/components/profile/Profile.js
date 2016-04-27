var React = require('react');

var CompletedGamesContainer = require('./CompletedGamesContainer.js');

var io = require('socket.io-client');
var socket = io.connect();
var Auth = require('../../../server/auth')

module.exports = React.createClass({
  getInitialState: function(){
    return { completedGames: [] }
  },
  componentDidMount: function(){
    socket.on('update:games:completed', this.updateCompletedGames);
    socket.emit('fetch:completedGames', {username: this.props.user})
  },
  updateCompletedGames: function(data){
    this.setState({completedGames: data.games})
  },
  render: function(){
    return (
      <div>
        <div className="container">
          {this.props.user}'s Completed Games
        </div>
        <CompletedGamesContainer completedGames={this.state.completedGames} />
      </div>
    )
  }
})