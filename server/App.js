var React = require('react');
var ReactDOM = require('react-dom');
var RRouter = require('react-router');
var Index = require('../app/components/Index');
var Signin = require('../app/components/Signin');
var Gameview = require('../app/components/GameView')

ReactDOM.render((
        <RRouter.Router history={RRouter.browserHistory} >
          <RRouter.Route path="/" component={Index}/>
          <RRouter.Route path="/signin" component={Signin}/>
          <RRouter.Route path="/gameview" component={Gameview}/>
        </RRouter.Router>
    ), document.getElementById('app')
)