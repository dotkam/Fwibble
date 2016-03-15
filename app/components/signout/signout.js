var React = require('react');
var Auth = require('../../../server/auth');

module.exports = React.createClass({
  componentDidMount: function(){
    Auth.logout();
  },
  render: function(){
    return <p>Successfully logged out</p>
  }
})