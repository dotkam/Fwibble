var React = require('react');
var ReactDOM = require('react-dom');
var StoryInput = require('./StoryInput.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


module.exports = React.createClass({

	getInitialState: function() {
		return {userColors: {}, usersLength: 0};
	},

	componentWillMount: function() {
		// if(this.state.usersLength!==this.props.users.length) {
		// 	var options = ['#F9096E','#24C9C9','#9ACC00'], curr=0;
	    
	 //    for (var i=0; i<this.props.users.length; i++) {
	 //      this.state.userColors[this.props.users[i]] = options[curr]
	 //      if (curr<options.length-1) {curr++} else {curr=0}
	 //    }	
		// }
	},

	render: function() {
		var options = ['#F9096E','#24C9C9','#9ACC00'], curr=0;
		var color = this.props.gameState === 'completed' ? '#000' : options[this.props.users.indexOf(this.props.user) % 3];
		var style = {color: color};
		var spacer = "\u00a0";

	  return (
			<ReactCSSTransitionGroup transitionName = "fwib" transitionAppear = {true}
				transitionAppearTimeout = {500} transitionEnter = {false} transitionLeave = {false}>

				<b className="fwib" style={style}>
			  	{this.props.text}{spacer}
				</b>

			</ReactCSSTransitionGroup>

		);
	}
});