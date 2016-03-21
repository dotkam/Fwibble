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
        <p>Need more Fwibbles in your life?</p>
        <button type="button" className="btn btn-primary btn-md" a href='/signin'>Sign In</button>
      </div>
    );
  }
});