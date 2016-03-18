var React = require('react');
var Link = require('react-router').Link;
var $ = require('../../../jquery.min.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: '',
      loginErr: null
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
    
    var postData = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password
    })
    console.log('data:',postData)

    $.ajax({
      type: 'POST',
      url: '/user/signup',
      data: postData,
      contentType: 'application/json',
      success: function(data) {
        console.log("success data:", data)
        // display error if username unavailable else create user and login
        if (data.error) {
          this.setState({loginError: (<div className="alert alert-danger"><strong>{data.error}</strong></div>)})
        } else {
          this.setState({loginError: (<div className="alert alert-success"><strong>Login Successful</strong></div>)})
          // var setUserClosure = this.props.setUser;
          this.props.setUser({username: data.activeUser, active_game: data.activeGame});
          // setTimeout(function(){setUserClosure(data.activeUser)}, 1000);
        }
      }.bind(this),
      error: function(data) {
        console.error("error data:", data)
      }.bind(this)

    });
    this.setState({password: ""})
  },

  render: function() {

    return (
      <div className="container">
        <h2>Signup Page</h2>
        <div><Link to="/">Home</Link></div>
        <br />
        <div className="signUpForm">
	        <form>
		        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsername} />
		        <br/>
		        <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
		        <br/>
		        <input type="submit" name="signUpSubmit" onClick={this.handleClick} />
            {this.state.loginError}
		      </form>
		    </div>
      </div>
    )
  }
})