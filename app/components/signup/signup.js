var React = require('react');
var Link = require('react-router').Link;
var $ = require('../jquery.min.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: ''
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
      url: '/user/signup',
      data: postData,
      contentType: 'application/json',
      success: function(data) {
        console.log("success data:", data)
        this.props.setUser(data.activeUser);
      }.bind(this),
      error: function(data) {
        console.error("error data:", data)
      }.bind(this)

    });
    this.setState({password: ""})
  },

  render: function() {

    return (
      <div>
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
		      </form>
		    </div>
      </div>
    )
  }
})