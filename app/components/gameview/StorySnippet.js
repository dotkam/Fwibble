var React = require('react');
var ReactDOM = require('react-dom');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({
	// getInitialState: function(){
 //      return {
 //        currentText: 'blah'
 //      }
 //  },

	render: function() {
	  return (
		<div className="storySnippet">
		  <span>{this.props.text}</span>		
		</div>
		);
	}
});



	//   return (
	// 	<div class-name="storyInputDisplay">
	// 	  <form onSubmit={this.props.onClick}>
	// 	    <input className="newStoryInput" type="text" placeholder="Enter 6 words"></input>
	// 	    <button type="submit">Submit</button>
	// 	    <div>Hey {this.state.currentText}</div>
	// 	  </form>
	//     </div>
	// 	)
// 	}
// });