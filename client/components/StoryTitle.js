var React = require('react');
var ReactDOM = require('react-dom');

var StoryTitle = React.createClass({
	render: function () {
		var Title = (<div>Title loading...</div>);

		if (true) { Title = Title; }

		return (
			<h1 className="StoryTitle">
				{Title}
			</h1>
		);
	}
});