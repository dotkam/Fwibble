var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var LobbyGameContainer = require('./LobbyGameContainer.js');

var io = require('socket.io-client');
var socket = io.connect();
var Auth = require('../../../server/auth')

module.exports = React.createClass({

  getInitialState: function() {
    return {openGames: []};
  },
  componentDidMount: function(){
    socket.on('update:games:joinable', this.updateOpenGames);
    socket.on('enter:game', this.props.setUser);
  },
  updateOpenGames: function(data){
      console.log('Lobby socket hears data:', data)
      this.setState({openGames: data.games})
  },
  generateGameRoom: function(){
    socket.emit('create:game_room', {username: this.props.user});
    console.log('sent create:game_room', this.props.user);
  },
  render: function() {
    socket.emit('lobby:games',this.state.openGames);
    return (
			<div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
      				<h2>Greetings, Fwibbler!</h2><h4>You can create your own new Fwibble now or join an existing Fwibble below.</h4>
            </div>
          </div>
          <br />
            <div className="text-center">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="newFwibble">
                    <button type="button" className="btn btn-success btn-outline btn-lg btn-block" onClick={this.generateGameRoom}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> New Fwibble</button>
                  </div>
                </div>
              </div>
            </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12">
              <h3>Existing Fwibbles to Join:</h3>
            </div>
          </div>
          <br />
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