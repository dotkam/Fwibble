var React = require('react');
var ReactDOM = require('react-dom');
var StoryTitle = require('./StoryTitle.js');
var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');
var StorySnippet = require('./StorySnippet.js');
var UsersInRoom = require('./UsersInRoom.js');

var io = require('socket.io-client');
var socket = io.connect();







module.exports = React.createClass({

  getInitialState() {
    return {users: [], storySnippets:[], text: ''};
  },

  componentDidMount() {
   socket.on('init', this._initialize);
   socket.on('send:storySnippet', this._snippetReceive);
   socket.on('user:join', this._userJoined);
   socket.on('user:left', this._userLeft);
  },

  _initialize(data) {
    var {users, name} = data;

    console.log('hello');

    this.setState({users, user: name});
  },

  _snippetReceive(snippet) {
    var {storySnippets} = this.state;
    storySnippets.push(storySnippet);
    this.setState({storySnippets});
  },

  _userJoined(data) {
    var {users, storySnippets} = this.state;
    var {name} = data;
    users.push(name);
    storySnippets.push({
      user: 'APPLICATION BOT',
      text : name +' Joined'
    });
    this.setState({users, storySnippets});
  },

  _userLeft(data) {
    var {users, storySnippets} = this.state;
    var {name} = data;
    var index = users.indexOf(name);
    users.splice(index, 1);
    storySnippets.push({
      user: 'APPLICATION BOT',
      text : name +' Left'
    });
    this.setState({users, storySnippets});
  },

  handleSnippetSubmit(storySnippet) {
    var {storySnippets} = this.state;
    storySnippets.push(storySnippet);
    for (var i = 0; i < storySnippets.length; i++) {
      // console.log(storySnippets[i]);
      // console.log(storySnippets[i].text);
    }
    this.setState({storySnippets});
    socket.emit('send:storySnippet', storySnippet);
  },


	render: function() {
		return (
			<div>
				<StoryTitle />
        <StoryBox
          storySnippets={this.state.storySnippets}
        />
        <StoryInput
          onSnippetSubmit={this.handleSnippetSubmit}
          user={this.state.user}
        />
				<UsersInRoom 
				  users={this.state.users}
				/>
			</div>
		);
	}

});