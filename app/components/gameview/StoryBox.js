var React = require('react');
var ReactDOM = require('react-dom');
var StorySnippet = require('./StorySnippet.js');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({

	getInitialState() {
		  return {user: ''};
		},

		handleSubmit(e) {
			e.preventDefault();
			var users = {
				user : this.props.user,
				text : this.state.text
			}
			this.props.onSnippetSubmit(storySnippet);	
			this.setState({ text: '' });
		},

		changeHandler(e) {
			this.setState({ text : e.target.value });
		},

  render() {
	return (
	  <div className='storySnippets'>
		<h2> Story: </h2>
		{
		  this.props.storySnippets.map((storySnippet, i) => {
			return (
			  <StorySnippet
			    key={i}
					user={storySnippet.user}
				  text={storySnippet.text} 
			  />
			);
		  })
		} 
	  </div>
	);
	}
});