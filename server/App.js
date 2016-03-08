var React = require('react');
var ReactDOM = require('react-dom');
var RRouter = require('react-router');
var Index = require('../modules/Index');
var Signin = require('../modules/Signin');
var Game = require('../modules/Game');
var Gameview = require('../app/components/GameView')

ReactDOM.render((
        <RRouter.Router history={RRouter.browserHistory} >
          <RRouter.Route path="/" component={Index}/>
          <RRouter.Route path="/signin" component={Signin}/>
          <RRouter.Route path="/game" component={Game}/>
          <RRouter.Route path="/gameview" component={Gameview}/>
        </RRouter.Router>
    ), document.getElementById('app')
)