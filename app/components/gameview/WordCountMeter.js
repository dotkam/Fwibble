var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

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