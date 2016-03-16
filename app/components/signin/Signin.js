var React = require('react');
var Link = require('react-router').Link;
var $ = require('../jquery.min.js');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var DefaultRoute = Router.DefaultRoute;  
var Route = Router.Route; 

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
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
    // console.log("username:", this.state.username, "\npassword:", this.state.password)
    
    var postData = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password
    })
    console.log('postData:',postData)

    $.ajax({
      type: 'POST',
      url: '/user/signin',
      data: postData,
      contentType: 'application/json',
      success: function(data) {

        // data === whatever we respond with in user-api.js
        //        {
        //          userStatus: false,
        //          passStatus: false,
        //          activeUser: null,
        //          activeGame: null,
        //          errMessage: null
        //        }
        
        console.log('Signin response object:', data)

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

        // Or set active user and route to game
        } else {
          this.setState({loginErr: false})
          this.props.setUser(data.activeUser)
          // TODO: route to game page
          this.context.router.replace('/gameview')
        }

        console.log('props.user:',this.props.user)


      }.bind(this),
      error: function(data) {
        console.error("Connection error:", data)
      }.bind(this)

    });
  },

  render: function() {
    var loginMessage = this.state.loginErr ? this.state.loginMsg : null;

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
		        <input type="submit" name="signInSubmit" onClick={this.handleClick} /> 
		      </form>
          <p>{loginMessage}</p>
          <div><Link to="/signup">Don't have an account yet? Sign up!</Link></div>
		    </div>
      </div>
    )
  }
})