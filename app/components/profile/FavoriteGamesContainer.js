var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="text-center">
            <ul className="list-unstyled">
              {
                this.props.favoriteGames.map((game, i) => {
                  return (
                    <div key={i}>
                      <li className="btn-group">
                        <Link to={`archive/${game.game_hash}`} className="btn btn-primary btn-outline btn-lg">{game.game_title}</Link>
                        <button className="btn btn-success btn-outline btn-lg" onClick={this.props.toggleFavorite.bind(null, game.game_hash)} ><div className="glyphicon glyphicon-star"></div></button>
                        <button className="btn btn-danger btn-outline btn-lg" onClick={this.props.deleteGame.bind(null, game.game_hash)} ><div className="glyphicon glyphicon-trash"></div></button>
                      </li>
                      <br/>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>    )
  }
})