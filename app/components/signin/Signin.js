var React = require('react');
var Link = require('react-router').Link;
var $ = require('../jquery.min.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var DefaultRoute = Router.DefaultRoute;  
var Route = Router.Route; 

module.exports = React.createClass({

  // mixins: [Navigation],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      loginErr: false,
      loginMsg: null
    }
  },

  handleUsername: function (e) {
    this.setState({username: e.target.value})
  },

  handlePassword: function (e) {
    this.setState({password: e.target.value})
  },

  handleClick: function (e) {
    e.preventDefault()
    console.log("username:", this.state.username, "\npassword:", this.state.password)
    
    var postData = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password
    })
    console.log('data:',postData)

    $.ajax({
      type: 'POST',
      url: '/user/signin',
      data: postData,
      contentType: 'application/json',
      success: function(data) {
        // data === whatever we respond with in user-api.js
        // console.log("success data:", data)
        // this.transitionTo('gameview') 
        //Object {userStatus: false, passStatus: false, activeUser: null, 
        // activeGame: null, errMessage: "Username not found. Please create an
        
        console.log('Login response object:', data)
        // handle err message
        if (data.errMessage!==null) {
          this.setState({loginMsg: data.errMessage})
          if (data.userStatus===false) {
            this.setState({username: ""})
            this.setState({password: ""})
          } else {
              this.setState({password: ""})
          }
          // trigger display of error message
          this.setState({loginErr: true})
        // or set active user
        } else {
          this.setState({loginErr: false})
          this.props.setUser(data.activeUser)
          // TODO: route to game page
        }


        console.log('props:',this.props)
        // console.log(this.props.user)

      }.bind(this),
      error: function(data) {
        console.error("Connection error:", data)
      }.bind(this)

    });
  },

  render: function() {
    var loginMessage = this.state.loginErr ? <div>{this.state.loginMsg}</div> : null;

    return (
      <div>
        <h2>Signin Page</h2>
        <div><Link to="/">Home</Link></div>
        <br />
        <div className="signInForm">
	        <form onSubmit={this.trySignIn}>
		        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsername} />
		        <br/>
		        <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
		        <br/>
		        <input type="submit" name="signInSubmit" onClick={this.handleClick} />           {loginMessage}
		      </form>
          <br />
          <div><Link to="/signup">Don't have an account yet? Sign up!</Link></div>
		    </div>
      </div>
    )
  }
})