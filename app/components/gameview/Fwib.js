var React = require('react');
var ReactDOM = require('react-dom');
var StoryInput = require('./StoryInput.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


module.exports = React.createClass({

	getInitialState: function() {
		return {userColors: {}, usersLength: 0};
	},

	componentWillMount: function() {
		if(this.state.usersLength!==this.props.users.length) {
			var options = ['#F9096E','#24C9C9','#9ACC00'], curr=0;
	    
	    for (var i=0; i<this.props.users.length; i++) {
	      this.state.userColors[this.props.users[i]] = options[curr]
	      if (curr<options.length-1) {curr++} else {curr=0}
	    }	
		}
	},

	render: function() {
		var color = this.state.userColors[this.props.user];
		var style = {color: color};
		var spacer = "\u00a0";
	  var text = this.props.text;
	  console.log('rctg', ReactCSSTransitionGroup)

	  console.log('fwib props', this.props)
	  return (
<ReactCSSTransitionGroup transitionName = "example"
               transitionAppear = {true} transitionAppearTimeout = {500}
               transitionEnter = {false} transitionLeave = {false}>

		<b className="fwib" style={style}>
		  	{text}{spacer}
		</b>
				  </ReactCSSTransitionGroup>

		);
	}
});