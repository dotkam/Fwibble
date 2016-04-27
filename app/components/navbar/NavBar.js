var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Logo = require('./../../images/Fwibble-logo-cropped.png')

module.exports = React.createClass({

  render: function() {

    return (
      <div className='navbar navbar-default navbar-static-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <div><img src={Logo} alt="Fwibble" className="navbar-brand"/></div>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {this.props.active_game !== null ?
              <li className="container-fluid">
                <Link to={`/gameview/${this.props.active_game}`} className="menuOptions">MY GAME</Link>
             </li>
             : null
            }
            <li className="container-fluid">
              <Link to="/profile">PROFILE</Link>
            </li>
            <li className="container-fluid">
              <Link to="/lobby">LOBBY</Link>
            </li>
            <li className="container-fluid">
              <Link to='/about'>ABOUT</Link>
            </li>
            <li className="container-fluid">
              <Link to='/signout'>SIGN OUT</Link>
            </li>
          </ul>
        </div>
      </div>
   )
 }
});