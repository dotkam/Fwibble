var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Stylesheet = require('../public/styles.css');
var NavBar = require('../app/components/navbar/NavBar');
var Signin = require('../app/components/signin/Signin');
var Signup = require('../app/components/signup/Signup');
var Signout = require('../app/components/signout/Signout');
var Profile = require('../app/components/profile/Profile');
var Lobby = require('../app/components/lobby/Lobby');
var Archive = require('../app/components/archive/ArchiveGame');
var Gameview = require('../app/components/gameview/GameView');
var About = require('../app/components/about/About');

var Auth = require('./auth');
var alertify = require('alertify.js');
alertify.logPosition('bottom right');


var logo = '../public/images/Fwibble-logo-cropped.png';

var port = 3000;
var connectionPoint = 'rocky-forest-16843.herokuapp.com'

if (window.location.hostname === 'localhost'){
  connectionPoint = 'localhost:3000';
}


var io = require('socket.io-client');

var socket = io.connect(connectionPoint);

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn(), active_game: ''}
  },

  componentDidMount: function(){
    if(localStorage.fwibbleToken){
      console.log('has a fwibble token:', localStorage.fwibbleToken)
      socket.emit('fetch:userData', { token: localStorage.fwibbleToken })
    }
    socket.on('valid_user', this.setUser)
  },
  validUser: function(data){
    this.setState({ username: data.username });
  },
  setUser: function(data) {
    console.log('setUser data', data)
    Auth.login();
    this.setState({

      username: data.username,
      loggedIn: Auth.loggedIn(),
      active_game: data.active_game
    });

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
    console.log("calling JOINGAME:", data)
    socket.emit('join:game', {username: data.user, game_hash: data.game_hash})
    this.setState({active_game: data.game_hash});
  },
  fetchUsers: function(gamehash){
    socket.emit('fetch:users', {active_game: gamehash});
  },
  logoutUser: function(){
    socket.emit('logout', {username: this.state.username});
    Auth.logout();
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn(),
      active_game: ''
    })
    alertify.success('Successfully logged out');
  },
  endTimer: function(){
    if(this.state.secondsLeft === 0){
    socket.emit('endtimer', {gamehash: this.state.active_game});
    }
  },

  render: function() {

  var navBarShow = this.state.loggedIn ? (<NavBar active_game={this.state.active_game} loggedIn={this.state.loggedIn} logo={this.state.logo}/>) : null;

    return (
      <div>
        {navBarShow}
        {this.props.children && React.cloneElement(this.props.children, {
          setUser: this.setUser,
          user: this.state.username,
          logoutUser: this.logoutUser,
          joinGame: this.joinGame,
          leaveGame: this.leaveGame,
          setActiveGame: this.setActiveGame,
          active_game: this.state.active_game,
          logo: this.state.logo
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
            <Route path='archive/:game_hash' component={Archive} />
            <Route path='gameview/:game_hash' component={Gameview} />
            <Route path='profile' component={Profile} />
            <Route path='lobby' component={Lobby} onEnter={Auth.requireAuth} />
            <Route path='about' component={About} />
          </Route>
        </Router>
  ), document.getElementById('app')
)
