var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var Index = require('../app/components/index/Index');
var Signin = require('../app/components/signin/Signin');
var Gameview = require('../app/components/gameview/GameView')

ReactDOM.render((
        <Router history={browserHistory} >
          <Route path="/" component={Index}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/gameview" component={Gameview}/>
        </Router>
    ), document.getElementById('app')
)