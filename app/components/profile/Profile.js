var React = require('react');

var FavoriteGamesContainer = require('./FavoriteGamesContainer.js');

var io = require('socket.io-client');
var socket = io.connect();
var Auth = require('../../../server/auth')

module.exports = React.createClass({
  getInitialState: function(){
    return { completedGames: [] }
  },
  componentDidMount: function(){
    socket.on('update:games:completed', this.updateCompletedGames);
    socket.emit('fetch:completedGames', {username: this.props.user});
  },
  updateCompletedGames: function(data){
    this.setState({completedGames: data.games})
  },
  toggleFavorite: function(data){
    var { completedGames } = this.state;
    completedGames = completedGames.map(function(game){
      if(game.game_hash === data.gamehash){
        game.favorite = !data.favorite;
      }
      return game;
    });
    this.setState({completedGames: completedGames});
    socket.emit('favorite:game:toggle', {username: this.props.user, game_hash: data.gamehash, favorite: !data.favorite});
  },
  deleteGame: function(gamehash){
    // if(confirm('Are you sure you want to delete this game?') === true){ // DO STUFF }   
    var { completedGames } = this.state;
      completedGames = completedGames.filter((game) => game.game_hash !== gamehash);
      this.setState({completedGames: completedGames});
      socket.emit('archive:delete', {username: this.props.user, game_hash: gamehash});
  },
  render: function(){
    var favoriteGames = this.state.completedGames.filter((game) => game.favorite === true);
    var nonFavoriteGames = this.state.completedGames.filter((game) => game.favorite !== true);
    return (
      <div>
        <h2 className="container">
          {this.props.user}'s Favorite Fwibs
        </h2>
        <FavoriteGamesContainer user={this.props.user} toggleFavorite={this.toggleFavorite} deleteGame={this.deleteGame} listedGames={favoriteGames} />
        <h2 className="container">
          {this.props.user}'s Completed Games
        </h2>
        <FavoriteGamesContainer user={this.props.user} toggleFavorite={this.toggleFavorite} deleteGame={this.deleteGame} listedGames={nonFavoriteGames} />
      </div>
    )
  }
})