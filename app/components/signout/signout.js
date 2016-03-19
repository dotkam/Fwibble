var React = require('react');
var Auth = require('../../../server/auth');

var io = require('socket.io-client');
var socket = io.connect();

module.exports = React.createClass({
  componentDidMount: function(){
  	socket.on('signout', this._logout);
    this.props.logoutUser();
  },
  _logout: function() {
  	var username = this.prop.user;
  	socket.broadcast.emit('signout:username', {username: username});
  },
  render: function(){
    return <p>Successfully logged out</p>
  }
})