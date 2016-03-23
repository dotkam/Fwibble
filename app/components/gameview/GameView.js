var React = require('react');
var ReactDOM = require('react-dom');

// var StoryContainer = require('./StoryContainer');
var StoryTitle = require('./StoryTitle');
var StoryContainer = require('./StoryContainer.js');
var Fwib = require('./Fwib.js');
var UsersInRoom = require('./UsersInRoom.js');
var GoButton = require('./GoButton.js');
var LeaveGameButton = require('./LeaveGameButton.js');

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {users: [], fwibs:[], text: '', turn: 0, myTurn: true, showStory: false, active: false};
  },
  componentWillMount: function(){
  },
  componentDidMount: function() {
   socket.on('init', this._initialize);
   socket.on('send:fwib', this._fwibReceive);
   socket.on('user:join', this._userJoined);
   socket.on('user:left', this._userLeft);
   socket.on('update:turn', this._setTurn);
   socket.on('update:users', this._updateUsers);
   socket.on('update:active_game', this.props.setActiveGame);
   socket.on('game:start', this.startUp);
    if(!this.props.active_game){
      console.log('this.params.game_hash', this.props.params.game_hash)
      this.props.joinGame({user: this.props.user, game_hash: this.props.params.game_hash});
    }
    if(this.state.user === undefined){ // change to find user in users array - Maybe not?
    // Fetch all info for this gameroom this.params.url
      var {user} = this.props;
      var {users} = this.state;
      socket.emit('fetch:users', {user: user, users: users, game_hash: this.props.params.game_hash});
    }
  },

  _initialize: function(data) {
    var {users, user} = data;
    users = users.map((u) => u.username)
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
    var {name} = data;
    this.setState({users, fwibs});
    
    // TODO: put this logic in GO button function instead!
    var {myTurn} = this.state;
    if (user===users[0]) { myTurn = true };
    this.setState({myTurn});
  },
  leaveGame: function() {
    // on clicking leave room button, 
    // change game state from active to ?????
    console.log('IM LEAVING', this.props.user, this.props.active_game);
    socket.emit('leave:game', {username: this.props.user, game_hash: this.props.active_game});
    this.context.router.replace(`/lobby`);
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
  _updateUsers: function(data){
    console.log('update users:', data)
    var {users} = data
    users = users.map((u)=>u.username);
    this.setState({users: users});
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

  onGo: function() {
    this.setState({ showStory: true });
    socket.emit('update:game:inprogress', {game_hash: this.props.params.game_hash})
  },
  startUp: function() {
    this.setState({ showStory: true });
  },
  render: function() {
    // Add user to this game if they are not already
    // if(!this.props.active_game){
    //   console.log('this.params.game_hash', this.props.params.game_hash)
    //   this.props.joinGame({user: this.props.user, game_hash: this.props.params.game_hash});
    // }
    // if(this.state.user === undefined){ // change to find user in users array - Maybe not?
    // // Fetch all info for this gameroom this.params.url
    //   var {user} = this.props;
    //   var {users} = this.state;
    //   socket.emit('fetch:users', {user: user, users: users, game_hash: this.props.params.game_hash});
    // }
    console.log('showstory', this.state.showStory)
    var display = this.state.showStory ? (<StoryContainer fwibs={this.state.fwibs} onFwibSubmit={this.handleFwibSubmit} user={this.state.user} active_game={this.state.active_game} myTurn={this.state.myTurn} />) : (<GoButton goButtonPush={this.onGo} gameStart={this.startUp}/>);
    var leave = this.state.showStory ? null : (<LeaveGameButton leaveGame={this.leaveGame} />);
    console.log('after', this.state.showStory)

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <StoryTitle />
              {display}
              {leave}
              </div>
            <div className="col-md-3">
              <UsersInRoom users={this.state.users} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}); 
