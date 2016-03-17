var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var LobbyGameContainer = require('./LobbyGameContainer.js');

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({

  getInitialState: function() {
    return {openGames: []};
  },

  componentDidMount: function(){

  },

	render: function() {
		return (
			<div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
      				<h3>Greetings, Fwibbler! You can create your own new Fwibble now or join an existing Fwibble below.</h3>
            </div>
          </div>
          <div className="col-md-8 col-offset-2">
            <button type="button" className="btn btn-primary btn-lg btn-block">New Fwibble</button>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-8 col-offset-4">
              <h3>Existing Fwibbles</h3>
            </div>
          </div>
          <br />
          <div>
            <div className="row">
              <LobbyGameContainer openGames={this.state.openGames} />
            </div>
           
          </div>
        </div>
		  </div>
		);
	}
});