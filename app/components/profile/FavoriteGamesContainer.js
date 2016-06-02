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
                this.props.listedGames.map((game, i) => {
                  return (
                    <div key={i}>
                      <li className="btn-group btn-group-justified">
                        <div className="btn-group btn-group-big">
                          <Link to={`archive/${game.game_hash}`} className="btn btn-primary btn-outline btn-lg">{game.game_title}</Link>
                        </div>
                        <div className="btn-group-small btn-group">
                          <button className="btn btn-favorite btn-outline btn-lg" onClick={this.props.toggleFavorite.bind(null, {gamehash: game.game_hash, favorite: game.favorite})} ><div className="glyphicon glyphicon-star"></div></button>
                        </div>
                        <div className="btn-group btn-group-small">
                          <button className="btn btn-danger btn-outline btn-lg" onClick={this.props.deleteGame.bind(null, game.game_hash)} ><div className="glyphicon glyphicon-trash"></div></button>
                        </div>
                      </li>
                      <br/>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
})