var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
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