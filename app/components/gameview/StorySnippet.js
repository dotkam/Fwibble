var React = require('react');
var ReactDOM = require('react-dom');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({

	render: function() {
	  return (
		<div className="storySnippet">
		  <span>{this.props.text}</span>		
		</div>
		);
	}
});