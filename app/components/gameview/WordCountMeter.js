var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  // getInitialState: function() {
  //   ....
  // },

  // countWords: function(e) {
  //   e.preventDefault();
    //we'll only want to show this when it's your turn...
    // this will be handled with a function in gameview



    /*
    var trimmedWord = this.state.text.trim();
    var trimmedWordLength = trimmedWord.split(' ').length;

    if(trimmedWordLength === 6){    
      var fwib = {
        user : this.props.user,
        text : trimmedWord
      }
    */

/*
  render: function() {
    return (
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow={} aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
          <span class="sr-only">{}</span>
        </div>
      </div>

    )
  }
});
*/


// old stacked version - was partially working but not hooked up to anything:

  render: function() {
    return(
      <div className="progress">
        <div className="progress-bar progress-bar-warning" style={{width: "15%"}}>
          <span className="sr-only"> 5 words left (success)</span>
        </div>
        <div className="progress-bar progress-bar-warning" style={{width: "30%"}}>
          <span className="sr-only">4 words left (success)</span>
        </div>
        <div className="progress-bar progress-bar-warning" style={{width: "45%"}}>
          <span className="sr-only">3 words left (success)</span>
        </div>
        <div className="progress-bar progress-bar-warning" style={{width: "60%"}}>
          <span className="sr-only">2 words left (success)</span>
        </div>
        <div className="progress-bar progress-bar-warning" style={{width: "75%"}}>
          <span className="sr-only">1 word left (success)</span>
        </div>
        <div className="progress-bar progress-bar-success" style={{width: "90%"}}>
          <span className="sr-only">Done!(warning)</span>
        </div>
        <div className="progress-bar progress-bar-danger" style={{width: "100%"}}>
          <span className="sr-only">Too many words! (danger)</span>
        </div>
      </div>
    );
  }
});