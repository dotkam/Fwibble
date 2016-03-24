var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  getInitialState: function() {
    return { text: '', trimmedWordLength: 0 };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if(this.state.trimmedWordLength === 6){    
      var fwib = {
        user : this.props.user,
        text : this.state.text
      }
      this.props.onFwibSubmit(fwib); 
      this.setState({ text: '', trimmedWordLength: 0 });
    }
    else {
      console.log('Not 6 words!'); // Change to alert/flash
    }
  },

  changeHandler: function(e) {
    var text = e.target.value;
    var trimmedWordLength = text.trim().split(' ').length;
    this.setState({ text : text, trimmedWordLength: trimmedWordLength });
    
    // send length up to StoryContainer then down to WordCountMeter
    this.props.updateWordCount(trimmedWordLength);
  },

  render: function() {
    return(
      <div className='storyInput_form'>
        <form  className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="Enter 6 words"
            onChange={this.changeHandler}
            value={this.state.text}></input>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
});

