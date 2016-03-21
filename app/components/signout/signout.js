var React = require('react');
var Auth = require('../../../server/auth');

module.exports = React.createClass({
  componentDidMount: function(){
    this.props.logoutUser();
  },

  render: function(){
    
    return (
      <div className="container">
        <p>Successfully logged out</p>
        <a href="/signin">Need more Fwibbles in your life? Sign back in!</a>
      </div>
    );
  }
});