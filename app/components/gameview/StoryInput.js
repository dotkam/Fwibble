var React = require('react');
var ReactDOM = require('react-dom');
var WordCountMeter = require('./WordCountMeter.js');
var alertify = require('alertify.js');


module.exports = React.createClass({

  getInitialState: function() {
    return { text: '', trimmedWordLength: 0 };
  },
  componentDidMount: function(){
    document.getElementsByTagName('input')[0].focus();
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if(this.state.trimmedWordLength === 6){    
      var fwib = {
        user : this.props.user,
        text : this.state.text
      }
      this.props.onFwibSubmit(fwib); 
      alertify.success('What a Fwib!');
      this.setState({ text: '', trimmedWordLength: 0 });
    }
    else {
      alertify.error('Not 6 words!');
    }
  },

  changeHandler: function(e) {
    var text = e.target.value;
    var trimmedWordLength = text.trim().split(/\s+/).length;
    this.setState({ text : text, trimmedWordLength: trimmedWordLength });
  },

  render: function() {
    var wordMeter = (<WordCountMeter wordCount={this.state.trimmedWordLength} />)
    return(
      <div>
        <div className='storyInput_form'>
          <form  className="form-inline" onSubmit={this.handleSubmit} autoFocus>
            <input
              className="form-control"
              placeholder="Enter 6 words"
              onChange={this.changeHandler}
              value={this.state.text}></input>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
        <br />
        {wordMeter}
      </div>


    );
  }
});

