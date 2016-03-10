var React = require('react');
var Link = require('react-router').Link;

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
    this.setState({password: ""})
  },

  render: function() {
    return (
      <div>
        <h2>Signin Page</h2>
        <div><Link to="/">Home</Link></div>
        <br />
        <div className="signInForm">
	        <form onSubmit={this.trySignIn}>
		        <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsername} />
		        <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
		        <input type="submit" name="signInSubmit" onClick={this.handleClick} />
		      </form>
		    </div>
      </div>
    )
  }
})