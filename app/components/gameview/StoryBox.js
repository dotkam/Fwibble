var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render: function () {
		var snippets = ['Once upon a time in a', 'land down under there was a', 'crocodile that swallowed a whole fwibble'];
		
		var Story = "";
		for (var i=0; i<snippets.length; i++) {
			Story = Story + snippets[i] + " ";
		}

		return (
			<div className="StoryBox">
				{Story}
			</div>
		);
	}
});