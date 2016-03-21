var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


module.exports = React.createClass({
  render: function() {
    return (
      <div className="row">
        <ul className="list-unstyled">
            {
            this.props.openGames.map((openGame, i) => {
              return (
                <div key={i}>
                  <li>
                    <Link to={`/gameview/${openGame.game_hash}`} className="btn btn-primary btn-lg btn-block">{openGame.game_title} - {openGame.game_creator}</Link>
                  </li>
                  <br/>
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
});

  /*  {
            this.props.openGames.map((openGame, i) => {
              return (
                <li key={i}>
                  <button type="button" className="btn btn-primary btn-lg btn-block">{openGame.game_title}</button>{openGame}
                </li>
              );
            })
          }
  */