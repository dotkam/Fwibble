var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	handleSubmit: function(e) {
		// don't use html submit
		e.preventDefault();
	},
	render: function() {
	  return (
		<div class-name="storyInputDisplay">
		  <form onSubmit={this.handleSubmit}>
		    <input className="newStoryInput" type="text" placeholder="Enter 6 words"></input>
		    <button type="submit">Submit</button>
		  </form>
	    </div>
		)
	}
});