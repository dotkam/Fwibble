var React = require('react');
var ReactDOM = require('react-dom');
var StorySnippet = require('./StorySnippet.js');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({
  // getInitialState: function(){
  //   return {
  //     story: 'wizzleteats'
  //   }
  // },

	// handleNewStoryInput: function(e) {
	// 	// don't use html submit
	// 	e.preventDefault();

	// 	// $('newStoryInput').val('');
 //    },

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


	// render: function () {
	// 	var snippets = ['Once upon a time in a', 'land down under there was a', 'crocodile that swallowed a whole fwibble'];
		
	// 	var Story = "";
	// 	for (var i=0; i<snippets.length; i++) {
	// 		Story = Story + snippets[i] + " ";
	// 	}

	// 	return (
	// 	  <div className="StoryBox">
	// 	    {Story}
	// 	  <br/>
	// 	  <br/>
	// 	    <StoryInput />
	// 	  </div>
	// 	);
	// }