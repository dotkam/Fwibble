var React = require('react');
var ReactDOM = require('react-dom');
var StoryTitle = require('./StoryTitle.js');
var StoryBox = require('./StoryBox.js');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({


 //  handleSubmit: function(e) {
	// // don't use html submit
	// e.preventDefault();
 //  },

  render: function() {
    return (
	  <div className="fullGameView">
        <h1>Fwibble!</h1>
	    <StoryTitle />
	    <StoryBox />
	    <StoryInput />
	  </div>
    )
  }
});

				// 

// ReactDOM.render(<GameView />, document.getElementById('app'));


// <form onSubmit=/* write function: handleNewInput */ >
