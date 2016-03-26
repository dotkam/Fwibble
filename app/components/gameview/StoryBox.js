var React = require('react');
var ReactDOM = require('react-dom');
var Fwib = require('./Fwib.js');
var StoryInput = require('./StoryInput.js');

module.exports = React.createClass({

  getInitialState: function() {
      return {user: ''};
    },

    handleSubmit: function(e) {
      e.preventDefault();
      var users = {
        user : this.props.user,
        text : this.state.text
      }
      this.props.onFwibSubmit(fwib); 
      this.setState({ text: '' });
    },

    changeHandler(e) {
      this.setState({ text : e.target.value });
    },

  render: function() {
  return (
    <div className="fwibs">
      <div className="storyBoxStyling">
        <div className="story">
          {
            this.props.fwibs.map((fwib, i) => {
            return (
              <Fwib
                key={i}
                user={fwib.user}
                text={fwib.text} 
              />
            );
            })
          } 
        </div>
      </div>
    </div>
  );
  }
});