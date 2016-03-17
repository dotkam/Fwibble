var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;


module.exports = React.createClass({

  render: function() {
    return (
      <div className="row">
        <ul className="list-unstyled">
          <li><button type="button" className="btn btn-primary btn-lg btn-block">The Pumpkin that Ate the World and Then Was Very Lonely</button></li>
          <br />
          <li><button type="button" className="btn btn-primary btn-lg btn-block">The Day Batman Finally Just Had a Nice, Long Cry</button></li>
          <br />
          <li><button type="button" className="btn btn-primary btn-lg btn-block">Giggles the Clown Goes to Paris</button></li>
        </ul>
      </div>
    );
  }
});

  /*  {
            this.props.openGames.map((openGame, i) => {
              return (
                <li key={i}>
                  {openGame}
                </li>
              );
            })
          }
  */