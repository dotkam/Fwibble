var React = require('react');
var ReactDOM = require('react-dom');
var StoryTitle = require('./StoryTitle.js');
var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');
var Fwib = require('./Fwib.js');
var UsersInRoom = require('./UsersInRoom.js');

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({

  getInitialState: function() {
    return {users: [], fwibs:[], text: ''};
  },

  componentDidMount: function() {
   socket.on('init', this._initialize);
   socket.on('send:fwib', this._fwibReceive);
   socket.on('user:join', this._userJoined);
   socket.on('user:left', this._userLeft);
   console.log('Current state:', this.state);
  },

  _initialize: function(data) {
    var {users, name} = data;
    this.setState({users, user: name});
  },

  _fwibReceive: function(fwib) {
    console.log('fwibReceive fwib:', fwib)
    var {fwibs} = this.state;
    fwibs.push(fwib);
    this.setState({fwibs});
  },

  _userJoined: function(data) {
    var {users, fwibs} = this.state;
    var {name} = data;
    users.push(name);
    fwibs.push({
      user: 'APPLICATION BOT',
      text : name +' Joined'
    });
    this.setState({users, fwibs});
  },

  _userLeft: function(data) {
    var {users, fwibs} = this.state;
    var {name} = data;
    var index = users.indexOf(name);
    users.splice(index, 1);
    fwibs.push({
      user: 'APPLICATION BOT',
      text : name +' Left'
    });
    this.setState({users, fwibs});
  },

  handleFwibSubmit: function(fwib) {
    console.log('gameview fwib:', fwib);
    var {fwibs} = this.state;
    fwibs.push(fwib); // {text: fwib} => {text: fwib.text} => fwib
    this.setState({fwibs});
    socket.emit('send:fwib', fwib);
  },


	render: function() {
		return (
			<div>
				<StoryTitle />
        <StoryBox
          fwibs={this.state.fwibs}
        />
        <StoryInput
          onFwibSubmit={this.handleFwibSubmit}
          user={this.state.user}
        />
				<UsersInRoom 
				  users={this.state.users}
				/>
			</div>
		);
	}

});