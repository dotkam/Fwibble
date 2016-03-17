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
    return {users: [], fwibs:[], text: '', turn: 0, myTurn: false};
  },

  componentDidMount: function() {
   socket.on('init', this._initialize);
   socket.on('send:fwib', this._fwibReceive);
   socket.on('user:join', this._userJoined);
   socket.on('user:left', this._userLeft);
   socket.on('update:turn', this._setTurn);
  },

  _initialize: function(data) {
    var {users, name} = data;
    this.setState({users, user: name});
  },

  _fwibReceive: function(fwib) {
    console.log('fwib', fwib)
    var {fwibs} = this.state;
    fwibs.push(fwib);
    this.setState({fwibs});
  },

  _userJoined: function(data) {
    var {user, users, fwibs, turn} = this.state;
    var {name, users} = data;
    fwibs.push({
      user: 'APPLICATION BOT',
      text : name +' Joined'
    });
    console.log('user joined:', name)
    this.setState({users, fwibs});
    
    // TODO: put this logic in GO button function instead!
    var {myTurn} = this.state;
    if (user===users[0]) { myTurn = true };
    this.setState({myTurn});
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

  _setTurn: function(data){
    var {turn, user, users, myTurn} = this.state;
    turn = data.turn;
    if (user === users[turn]) {
      myTurn = true;
    }
    this.setState({turn, myTurn});
  },

  _changeTurn: function(){
    var {turn, users} = this.state;
    turn++;
    if(turn >= users.length){
      turn = 0;
    }
    return turn;
  },

  handleFwibSubmit: function(fwib) {
    var {fwibs, turn, users, user, myTurn} = this.state;
    if(user === users[turn]){
      fwibs.push(fwib);
      turn = this._changeTurn();
      myTurn = false;
      this.setState({fwibs, turn, myTurn});
      socket.emit('change:turn', turn);
      socket.emit('send:fwib', fwib);
      // send fwib to database
    }
    else {
      console.log('It\'s ' + users[turn] + '\'s turn!');
    }
  },

	render: function() {
    if(this.state.user === undefined){
      var {user} = this.props;
      console.log('user render', user)
      socket.emit('help', {user: user});
    }
    var inputForm = this.state.myTurn ? (<StoryInput onFwibSubmit={this.handleFwibSubmit} user={this.state.user} />) : null;

		return (
			<div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
      				<StoryTitle />
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-9">
                <StoryBox fwibs={this.state.fwibs} />
              </div>
              <div className="col-md-2">
        				<UsersInRoom users={this.state.users} />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            {inputForm}
          </div>
        </div>
			</div>
		);
	}
});