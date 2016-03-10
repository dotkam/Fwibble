var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var Index = require('../app/components/index/Index');
var Signin = require('../app/components/signin/Signin');
var Gameview = require('../app/components/gameview/GameView');



var App = React.createClass({
  render: function() {
    return (
      <div>
        <div>
          <h1>Fwibble</h1>
            <div><Link to='/signin'>Sign In</Link></div>
            <div><Link to='/gameview'>Game</Link></div>
        </div>
        {this.props.children}
      </div>
    )
  }
})

ReactDOM.render(
  (
        <Router history={browserHistory} >
          <Route path='/' component={App} >
            <Route path='signin' component={Signin}/>
            <Route path='gameview' component={Gameview}/>
          </Route>
        </Router>
  ), document.getElementById('app')
)