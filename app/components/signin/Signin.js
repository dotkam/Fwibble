var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    return (
      <div>
        <h2>Signin Page</h2>
        <div><Link to="/">Home</Link></div>
      </div>
    )
  }
})