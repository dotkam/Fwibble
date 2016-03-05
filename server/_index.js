var React = require('react');
var ReactDOM = require('react-dom');
var RRouter = require('react-router');
var Index = require('../modules/Index');
var Signin = require('../modules/Signin');
var Game = require('../modules/Game');

ReactDOM.render((
        <RRouter.Router history={RRouter.hashHistory} >
          <RRouter.Route path="/" component={Index}/>
          <RRouter.Route path="/signin" component={Signin}/>
          <RRouter.Route path="/game" component={Game}/>
        </RRouter.Router>
    ), document.getElementById('app')
)