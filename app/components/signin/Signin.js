var React = require('react');
var Link = require('react-router').Link;
var $ = require('../../../jquery.min.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var DefaultRoute = Router.DefaultRoute;  
var Route = Router.Route;

var alertify = require('alertify.js');
var logo = require('./../../images/Fwibble-logo-cropped.png');
var Spinner = require('react-spinkit');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      username: '',
      password: '',
      loginErr: false,
      loginMsg: null,
      showStory: false,
      loading: false
    }
  },
  
  componentDidMount: function(){
    document.getElementsByTagName('input')[0].focus();
  },

  handleUsername: function (e) {
    this.setState({username: e.target.value})
  },

  handlePassword: function (e) {
    this.setState({password: e.target.value})
  },

  handleClick: function (e) {
    e.preventDefault()
    // console.log("username:", this.state.username, "\npassword:", this.state.password)
    var postData = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password
    })
    console.log('postData:',postData)
    this.setState({loading: true}, function(){    
      $.ajax({
        type: 'POST',
        url: '/user/signin',
        data: postData,
        contentType: 'application/json',
        success: function(data) {

          //        {
          //          userStatus: false,
          //          passStatus: false,
          //          activeUser: null,
          //          activeGame: null,
          //          errMessage: null
          //        }
          
          console.log('Signin response object:', data)
          this.setState({loading: false})
          // Handle login err message
          if (data.errMessage!==null) {
            this.setState({loginMsg: data.errMessage})
            // clear input fields (if username is good, only clear password)
            if (data.userStatus===false) {
              this.setState({username: ""})
              this.setState({password: ""})
            } else {
                this.setState({password: ""})
            }
            // trigger on-page display of error message
            this.setState({loginErr: true})
            alertify.error(this.state.loginMsg);
          // Or set active user and route to game
          } else {
            this.setState({loginErr: false})
            alertify.success('Sign in successful!');
            this.props.setUser({username: data.activeUser, active_game: data.activeGame}) // was data.activeUser
            localStorage.fwibbleToken = data.sessToken;
          }

          console.log('props:',this.props)


        }.bind(this),
        error: function(data) {
          console.error("Connection error:", data)
          this.setState({loading: false})
        }.bind(this)

      });
    })
  },

  render: function() {
    var loginMessage = this.state.loginErr ? this.state.loginMsg : null;

    return (
      <div className="container">
        <div className="text-center">
          <div className="row">
            <div className="signinBox">
              <div className="col-md-6 col-md-offset-3">
                <div className="jumbotron">
                  <div><img src={logo} width='200px' alt="Fwibble" className="center-block"/></div>                      
                       <div className="signInForm">
                        <form onSubmit={this.trySignIn}>
                          <input type="text" className="form-control" placeholder="username" value={this.state.username} onChange={this.handleUsername} />
                          <br/>
                          <input type="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
                          <br/>
                            {
                              this.state.loading ? <Spinner spinnerName='three-bounce' noFadeIn />  : <input type="submit" className="btn btn-success" name="signUpSubmit" onClick={this.handleClick} />
                            }
                        </form>
                        <br/>
                        <div className="row">
                          <a href="/signup">Don't have an account yet? Sign up!</a>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
});