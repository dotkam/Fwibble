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
var Gameview = require('../app/components/gameview/GameView');
var Auth = require('./auth');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn(), active_game: '458d21'} // Ask Gilbert if this belongs in the state
  },
  setUser: function(username) {

    Auth.login();
    this.setState({
      username: username,
      loggedIn: Auth.loggedIn()
    })
    this.context.router.replace(`/gameview/${this.state.active_game}`)
  },
  logoutUser: function(){
    Auth.logout(); // log out on /signout
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn()
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
          user: this.state.username
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
            <Route path='signin' component={Signin}/>
            <Route path='signup' component={Signup}/>
            <Route path='signout' component={Signout}/>
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