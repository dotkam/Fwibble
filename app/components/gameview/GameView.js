var React = require('react');
var ReactDOM = require('react-dom');

var StoryTitle = require('./StoryTitle.js');
var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');
var Fwib = require('./Fwib.js');
var UsersInRoom = require('./UsersInRoom.js');
var WordCountMeter = require('./WordCountMeter.js');

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
    var {users, user} = data;
    console.log('setting state INIT', users, user)
    this.setState({users, user});
  },

  _fwibReceive: function(fwib) {
    console.log('fwib', fwib)
    var {fwibs} = this.state;
    fwibs.push(fwib);
    this.setState({fwibs});
  },

  _userJoined: function(data) {
    // Should just need to grab all data for this user - only broadcast 
    var {user, users, fwibs, turn} = this.state;
    var {name, users} = data;

    this.setState({users, fwibs});
    
    // TODO: put this logic in GO button function instead!
    var {myTurn} = this.state;
    if (user===users[0]) { myTurn = true };
    this.setState({myTurn});
  },

  _userLeft: function(data) { // TODO: need Leave Room button
    var {users, fwibs} = this.state;
    var {name} = data;
    var index = users.indexOf(name);
    users.splice(index, 1);

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
    if(user === users[turn]){ // This logic isn't necessary anymore
      fwibs.push(fwib);
      turn = this._changeTurn();
      myTurn = false;
      this.setState({fwibs, turn, myTurn});
      socket.emit('change:turn', turn);
      socket.emit('send:fwib', fwib);
    }
    else {
      console.log('It\'s ' + users[turn] + '\'s turn!');
    }
  },


  render: function() {
    // Fetch all info for this gameroom this.params.url
    if(this.state.user === undefined){ // change to find user in users array - Maybe not?
      var {user} = this.props;
      var {users} = this.state;
      console.log('user', user)
      socket.emit('gameview:enter', {user: user, users: users, game_hash: this.props.params.game_hash});
    }
    var inputForm = this.state.myTurn ? (<StoryInput onFwibSubmit={this.handleFwibSubmit} user={this.state.user} />) : null;
    var wordMeter = this.state.myTurn ? (<WordCountMeter onFwibSubmit={this.handleFwibSubmit} user={this.state.user} />) : null;
    // AJK
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
              <div className="col-md-8">
                <StoryBox fwibs={this.state.fwibs} />
                <br />
                {inputForm}
                <br />
                {wordMeter}
              </div>
              <div className="col-md-2 col-md-offset-1">
                <UsersInRoom users={this.state.users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});