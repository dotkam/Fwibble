var React = require('react');
var ReactDOM = require('react-dom');

// var StoryContainer = require('./StoryContainer');
// var StoryTitle = require('./StoryTitle');
var StoryContainer = require('./StoryContainer.js');
var Fwib = require('./Fwib.js');
var UsersInRoom = require('./UsersInRoom.js');
var GoButton = require('./GoButton.js');
var LeaveGameButton = require('./LeaveGameButton.js');
var OpenGame = require('./OpenGame.js');

var Canvas = require('../draw/Canvas.js');
var Gallery = require('../draw/Gallery.js');
var Draw = require('../draw/Draw.js');

var io = require('socket.io-client');
var socket = io.connect();
var alertify = require('alertify.js');


module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {

    return {
      users: [],
      fwibs:[],
      text: '',
      turn: 0,
      myTurn: false,
      gameState: 'loading',
      active: false,
      title: '',

      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: [],
      currentColor: 'black',

      drawings: []
    }
  },
  componentDidMount: function() {
   socket.on('title:update', this._setTitle)
   socket.on('init', this._initialize);
   socket.on('send:fwib', this._fwibReceive);
   socket.on('user:join', this._userJoined);
   socket.on('user:left', this._userLeft);
   socket.on('update:turn', this._setTurn);
   socket.on('update:users', this._updateUsers);
   socket.on('update:active_game', this.props.setActiveGame);
   socket.on('game:start', this.startUp);
   socket.on('game:end', this.gameEnd);
   socket.emit('subscribe', this.props.params.game_hash);

   if(this.state.title === ''){
     socket.emit('title', {gamehash: this.props.params.game_hash});
   };
    if(!this.props.active_game){
      console.log('this.params.game_hash', this.props.params.game_hash);
      console.log('this.props.joinGame:', this.props.joinGame)
      this.props.joinGame({user: this.props.user, game_hash: this.props.params.game_hash});
    }
    if(this.state.user === undefined){ // change to find user in users array - Maybe not?
      var {user} = this.props;
      var {users} = this.state;
      socket.emit('fetch:users', {user: user, users: users, game_hash: this.props.params.game_hash});
    }
  },

  _initialize: function(data) {
    var {users, user, fwibs, gameState} = data;
    var { myTurn, turn } = this.state;
    fwibs = fwibs.map(function(f){return {user: f.username, text: f.fwib_content}});
    console.log('init data', data)
    users = users.map((u) => u.username);
    myTurn = users[turn] === user;
    this.setState({users, user, myTurn, fwibs, gameState});
  },

  _fwibReceive: function(fwib) {
    console.log('fwib', fwib)
    var {fwibs} = this.state;
    fwibs.push(fwib);
    this.setState({fwibs});
  },

  _userJoined: function(data) {
    console.log('CLIENT USERJOINED:', data);
    var {user, users, fwibs, turn, myTurn} = this.state;
    var {username} = data;
    if (user===users[0]) { myTurn = true };
    users.push(username);
    this.setState({users, fwibs, myTurn});
  },
  leaveGame: function() {
    socket.emit('leave:game', {username: this.props.user, game_hash: this.props.active_game});
    socket.emit('unsubscribe', this.props.params.game_hash);
    this.context.router.replace(`/lobby`);
  },
  _userLeft: function(data) {
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
  _setTitle: function(data) {
    this.setState({title: data.title});
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
      myTurn = user === users[turn];
      fwib.game_hash = this.props.params.game_hash;
      this.setState({fwibs, turn, myTurn});
      socket.emit('change:turn', {turn: turn, game_hash: this.props.params.game_hash});
      socket.emit('send:fwib', fwib);
    }
    else {
      alertify.error('It\'s ' + users[turn] + '\'s turn!');
    }
  },
  startGame: function() {
    this._setTurn({turn: this.state.turn});
    socket.emit('update:game:inprogress', {game_hash: this.props.params.game_hash}) // send only to users listening to this channel (game_hash)
    socket.emit('archive:users', { users: this.state.users, game_hash: this.props.params.game_hash })
    this.setState({ gameState: 'in progress'});
  },
  startUp: function() {
    this.setState({ gameState: 'in progress' });
  },
  gameEnd: function() {
    this.setState({ gameState: 'completed' });
  },
  render: function() {
    var leave = this.state.gameState === 'completed' ? (<LeaveGameButton leaveGame={this.leaveGame} />) : null;
    var drawingPad = this.state.gameState === 'in progress' ? <Draw /> : null;
    var openGame = this.state.gameState === ('open') ? (<OpenGame leaveGame={this.leaveGame} startGame={this.startGame} />) :
    (<StoryContainer
      fwibs={this.state.fwibs}
      onFwibSubmit={this.handleFwibSubmit}
      user={this.state.user} users={this.state.users}
      active_game={this.props.params.game_hash}
      myTurn={this.state.myTurn}
      gameState={this.state.gameState}
    />) ;
    return (

      <div>
        <h3 className="StoryTitle">
          {this.state.title}
        </h3>
        {
          this.state.gameState === 'loading' ? null :
          (<div className="container">
            <div className="row">
              <div className="col-lg-4 col-xs-12">
                { openGame }
                { leave }
              </div>
              <div className="col-lg-3 col-lg-offset-1 col-xs-9">
                <Draw />
              </div>
              <div className="col-lg-2 col-lg-offset-2 panel-users col-xs-3">
                <UsersInRoom user={this.state.user} users={this.state.users} turn={this.state.turn} />
              </div>
            </div>
          </div>)
        }
      </div>
    );
  }
});
