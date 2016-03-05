var React = require('react');
var RRouter = require('react-router');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <h2>Signin Page</h2>
        <div><RRouter.Link to="/">Home</RRouter.Link></div>
      </div>
    )
  }
})