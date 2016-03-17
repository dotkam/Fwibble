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
    Auth.logout();
    this.setState({
      username: null,
      loggedIn: Auth.loggedIn()
    })
  },
  render: function() {
    return (
      <div>
        <div className="container-fluid">
          <div className='navbar'>
            <h1>Fwibble</h1>
            <ul className='nav-links'>
              <li><Link to={`/gameview/${this.state.active_game}`} className='fa fa-pencil'>Game</Link></li>
              <li>
                { this.state.loggedIn ?
                  (<Link to='/signout' className='fa fa-user'>Sign Out</Link>)
                  :(<Link to='/signin' className='fa fa-user'>Sign In</Link>)
                }
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children, {
            setUser: this.setUser,
            logoutUser: this.logoutUser,
            user: this.state.username
          })}
        </div>
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