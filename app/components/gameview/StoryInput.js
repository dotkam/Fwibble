var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var fwib = {
      user : this.props.user,
      text : this.state.text
    }
    this.props.onFwibSubmit(fwib); 
    this.setState({ text: '' });
  },

  changeHandler: function(e) {
    this.setState({ text : e.target.value });
  },

  render: function() {
    return(
      <div className='storyInput_form'>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter 6 words"
            onChange={this.changeHandler}
            value={this.state.text}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
});







//  getInitialState: function(){
//       return {
//         currentText: 'blah'
//       }
//   },

//  render: function() {
//    return (
//    <div class-name="storyInputDisplay">
//      <form onSubmit={this.props.onClick}>
//        <input className="newStoryInput" type="text" placeholder="Enter 6 words"></input>
//        <button type="submit">Submit</button>
//        <div>Hey {this.state.currentText}</div>
//      </form>
//      </div>
//    )
//  }
// });

//when submitted, create a new storySnippet(prop of master as well as a new snippet)