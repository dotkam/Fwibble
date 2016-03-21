var React = require('react');
var Auth = require('../../../server/auth');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  componentDidMount: function(){
  	// socket.on('logout', this._logout);
    this.props.logoutUser();
  },

  render: function(){
    
    return (
      <div className="container">
        <p>Successfully logged out</p>
        <a href="/signin">Need more Fwibbles in your life? Sign back in!</a>
      </div>
    );
  }
});