var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({

  render: function() {
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Fwibble</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                { this.props.loggedIn ?
                  (<Link to='/signout' className='fa fa-user'>Sign Out</Link>)
                  :(<Link to='/signin' className='fa fa-user'>Sign In</Link>)
                }
              </li>
              <li><Link to={`/gameview/${this.props.active_game}`} className="menuOptions">Game</Link></li>
            </ul>
          </div>
        </div>
    )
  }
});


/*

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Fwibble</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="menuOptions" href="/signin">Sign In</a></li>
              <li><a className="menuOptions" href="/gameview">Game</a></li>
            </ul>
          </div>
        </div>
    )
  }
});

*/