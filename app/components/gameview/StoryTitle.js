var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render: function () {
		var Title = (<div>Title Loading...</div>);

		if (true) { Title = Title; }

		return (
			<h1 className="StoryTitle">
				{Title}
			</h1>
		);
	}
});