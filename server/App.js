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

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn(), active_game: null}
  },
  setUser: function(data) {

    Auth.login();
    console.log('App data', data)
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

    this.context.router.replace(`/lobby`)
    // this.context.router.replace(`/gameview/${this.state.active_game}`)
  },
  getActiveGame: function(data){
    Auth.login();
    this.setState({
      active_game: data.active_game
    })
  },
  logoutUser: function(){
    Auth.logout();
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn(),
      active_game: null
    })
  },
  render: function() {
    return (
      <div>
        <NavBar 
        active_game={this.state.active_game} 
        loggedIn={this.state.loggedIn}
        />
        {this.props.children && React.cloneElement(this.props.children, {
          setUser: this.setUser,
          user: this.state.username,
          logoutUser: this.logoutUser 
        })}
      </div>
    )
  }
})

ReactDOM.render(
  (
        <Router history={browserHistory} >
          <Route path='/' component={App} >
            <IndexRoute component={Index} onEnter={Auth.requireAuth} />
            <Route path='signin' component={Signin} />
            <Route path='signup' component={Signup} />
            <Route path='signout' component={Signout} />
            <Route path='lobby' component={Lobby} />
            <Route path='gameview/:game_hash' component={Gameview} onEnter={Auth.requireAuth}/>
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