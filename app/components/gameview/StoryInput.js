var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var trimmedWord = this.state.text.trim();
    var trimmedWordLength = trimmedWord.split(' ').length;

    if(trimmedWordLength === 6){    
      var fwib = {
        user : this.props.user,
        text : trimmedWord
      }
      this.props.onFwibSubmit(fwib); 
    }
    else {
      console.log('Not 6 words!'); // Change to alert/flash
    }
    this.setState({ text: '' });
  },

  changeHandler: function(e) {
    this.setState({ text : e.target.value });
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