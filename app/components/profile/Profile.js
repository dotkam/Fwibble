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
  deleteGame: function(gamehash){
    // TODO get gamehash from button
    console.log('IVE BEEN CLICKED', gamehash);
    var { completedGames } = this.state;
      completedGames = completedGames.filter((game) => game.game_hash !== gamehash);
      this.setState({completedGames: completedGames});
      socket.emit('archive:delete', {username: this.props.user, game_hash: gamehash});
    // if(confirm('Are you sure you want to delete this game?') === true){ // DO STUFF }   
  },
  render: function(){
    return (
      <div>
        <h2 className="container">
          {this.props.user}'s Completed Games
        </h2>
        <CompletedGamesContainer user={this.props.user} deleteGame={this.deleteGame} completedGames={this.state.completedGames} />
      </div>
    )
  }
})