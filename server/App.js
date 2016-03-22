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
//var userActions = //
var Auth = require('./auth');

var io = require('socket.io-client');
var socket = io.connect();

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn(), active_game: null} // Ask Gilbert if this belongs in the state
  },

  componentDidMount: function(){
    // TODO grab user info based on session token
    // THEN setState based on this info
  },
  setUser: function(data) {
    console.log('setUser data', data)
    Auth.login();
    this.setState({

      username: data.username,
      loggedIn: Auth.loggedIn(),
      active_game: data.active_game
    });
    // $.ajax({
    //   type: 'POST',
    //   url: '/user/game', //game
    //   data: { username: username },
    //   contentType: 'application/json',
    //   success: function(data) {
    //     // TODO update state based off of active_game response
    //   },
    //   error: function(data) {
    //     console.error("Connection error:", data)
    //   }
    // });
    console.log('setUser active_game', this.state.active_game)
    if(this.state.active_game){
      this.context.router.replace(`/gameview/${data.active_game}`)
    }
    else {
      this.context.router.replace(`/lobby`)
    }
  },
  setActiveGame: function(data){
    this.setState({active_game: data.game_hash});
  },
  joinGame: function(data){
    socket.emit('join:game', {username: data.user, game_hash: data.game_hash})
    this.setState({active_game: data.game_hash});
  },
  logoutUser: function(){
    socket.emit('logout', {username: this.state.username});
    Auth.logout(); // log out on /signout
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn(),
      active_game: null
    })
  },
  // setActiveState: function(data){
  //   this.setState({
  //     activeGame
  //   })
  // }
  endTimer: function(){
    if(this.state.secondsLeft === 0){
    socket.emit('endtimer', {gamehash: this.state.active_game});
    }
  },

  render: function() {

  var navBarShow = this.state.loggedIn ? (<NavBar active_game={this.state.active_game} loggedIn={this.state.loggedIn} />) : null;

    return (
      <div>
        {navBarShow}
        {this.props.children && React.cloneElement(this.props.children, {
          setUser: this.setUser,
          user: this.state.username,
          logoutUser: this.logoutUser,
          joinGame: this.joinGame,
          active_game: this.state.active_game
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