var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Stylesheet = require('../public/styles.css');
var Index = require('../app/components/index/Index');
var NavBar = require('../app/components/navbar/NavBar');
var Signin = require('../app/components/signin/Signin');
var Signup = require('../app/components/signup/Signup');
var Signout = require('../app/components/signout/Signout');
var Lobby = require('../app/components/lobby/Lobby');
var Gameview = require('../app/components/gameview/GameView');

var Auth = require('./auth');
var Users = require('../app/actions/users');
var Games = require('../app/actions/games');
var Sessions = require('../app/actions/sessions');
var Fwibs = require('../app/actions/fwibs');

var io = require('socket.io-client');
var socket = io.connect();

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount: function(){
    // TODO grab user info based on session token
    // THEN setState based on this info
  },
  getInitialState: function() {
    return {username: null, loggedIn: Auth.loggedIn(), active_game: null} // Ask Gilbert if this belongs in the state
  },
  loginUser: Auth.login,
  logoutUser: function(){
    socket.emit('logout', {username: this.state.username});
    Auth.logout(); // log out on /signout
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn(),
      active_game: null
    })
  },
  getActiveGame: function(){
  },
  getUsers: function(){
  },
  getFwibs: function(){
  },
  getTurn: function(){
  },
  createSession: function(){
  },
  deleteSession: function(){
  },
  createGame: function(){
  },
  joinGame: function(data){
    socket.emit('join:game', {username: data.user, game_hash: data.game_hash})
    this.setState({active_game: data.game_hash});
  },
  leaveGame: function(){
  },
  createUser: function(){
  },
  userJoined: function(){},
  userLeft: function(){},
  sendFwib: function(){},
  receivedFwib: function(){},
  setUser: function(data) {
    Auth.login();
    this.setState({
      username: data.username,
      loggedIn: Auth.loggedIn(),
      active_game: data.active_game
    });
    var next = this.state.active_game ? `/gameview/${this.state.active_game}` : `/lobby`;
    this.context.router.replace(next)
  },
  render: function() {

  var navBarShow = this.state.loggedIn ? (<NavBar active_game={this.state.active_game} loggedIn={this.state.loggedIn} />) : null;

    return (
      <div>
        {navBarShow}
        {this.props.children && React.cloneElement(this.props.children, {
          user: this.state.username,
          active_game: this.state.active_game,
          users: this.state.users,
          fwibs: this.state.fwibs,
          turn: this.state.turn,
          loginUser: this.loginUser,
          setUser: this.setUser,
          logoutUser: this.logoutUser,
          joinGame: this.joinGame
        })}
      </div>
    )
  }
})

ReactDOM.render(
  (
        <Router history={browserHistory} >
          <Route path='/' component={App} >
            <IndexRoute component={Lobby} onEnter={Auth.requireAuth} />
            <Route path='signin' component={Signin} />
            <Route path='signup' component={Signup} />
            <Route path='signout' component={Signout} />
            <Route path='lobby' component={Lobby} onEnter={Auth.requireAuth} />
            <Route path='gameview/:game_hash' component={Gameview} onEnter={Auth.requireAuth} />
          </Route>
        </Router>
  ), document.getElementById('app')
)

/*

NavBar active_game={this.state.active_game} loggedIn={this.state.loggedIn}



*/





/*
   render: function() {
    return (
      <div>
        <NavBar />
        {this.props.children && React.cloneElement(this.props.children, {
          setUser: this.setUser,
          user: this.state.username
        })}
      </div>
    )
  }
})

*/