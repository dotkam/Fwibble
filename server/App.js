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
var Signout = require('../app/components/signout/Signout')
var Gameview = require('../app/components/gameview/GameView');
var Auth = require('./auth');


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {username: null, loggedIn: Auth.loggedIn()}
  },

  setUser: function(username) {
    console.log("App setUser called with", username)
    this.setState({
      username: username,
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

              <li>
                {this.state.loggedIn ?
                   (<Link to='/signout' className='fa fa-user'>Sign Out</Link>)
                  :(<Link to='/signin' className='fa fa-user'>Sign In</Link>)
                }
              </li>
              <li><Link to='/gameview' className='fa fa-pencil'>Game</Link></li>
            </ul>
          </div>
        </div>
        <div className="container">
          {this.props.children && React.cloneElement(this.props.children, {
            setUser: this.setUser,
            user: this.state.username,
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
            <Route path='signin' component={Signin}/>
            <Route path='signup' component={Signup}/>
            <Route path='signout' component={Signout}/>
            <Route path='gameview' component={Gameview}/>
          </Route>
        </Router>
  ), document.getElementById('app')
)