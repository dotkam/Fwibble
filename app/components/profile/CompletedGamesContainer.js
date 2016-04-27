var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="text-center">
            <ul className="list-unstyled">
              {
                this.props.completedGames.map((game, i) => {
                  return (
                    <div key={i}>
                      <li>
                        <Link to={`archive/${game.game_hash}`} className="btn btn-primary btn-outline btn-lg btn-block">{game.game_title} | {game.game_creator}</Link>
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
});