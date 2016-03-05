var React = require('react');



var StoryTitle = React.createClass({
	render: function () {
		var Title = (<div>Title loading...</div>);

		if (true) { Title = Title; }

		return (
			<h1>
				{Title}
			</h1>
		);
	}
});


var StoryBox = React.createClass({
	render: function () {
		var snippets = ['Once upon a time in a', 'land down under there was a', 'crocodile that swallowed a whole fwibble'];
		
		var Story = "";
		for (var i=0; i<snippets.length; i++) {
			Story = Story + snippets[i] + " ";
		}

		return (
			<div className="storyBox">
				{Story}
			</div>
		);
	}
});


var StoryInput = React.createClass({
	handleSubmit: function(e) {
		// don't use html submit
		e.preventDefault();
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}> <br/> <br/>
				<input type="text" placeholder="Enter 6 words" />
				<button type="submit">Write</button>
			</form>
		)
	}
});

var GameView = React.createClass({
	getInitialState: function () {
		return {

		};
	},
	render: function () {
		return (
			<div className="gameView">
				<h1>Fwibble!</h1>
				<StoryTitle />
				<StoryBox />
				<StoryInput />
			</div>
		);
	}
});

// ReactDOM.render(
// 	<GameView/>,
// 	document.getElementById('app')
// );
