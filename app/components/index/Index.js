var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Index Page</h2>
        <div><Link to="/signin">Sign In</Link></div>
        <div><Link to="/gameview">Game</Link></div>
      </div>
    )
  }
})