var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
        /* <div className="progress-bar progress-bar-warning" style={{width: "15%"}}>
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
        </div> */

  render: function() {
    console.log('wordCountMeter reading:', this.props.wordCount)

    var width;
    if(this.props.wordCount>5) {width = '100%'}
      else {
        var value = "" + (100 * this.props.wordCount / 6);
        width = value.slice(0,2) + '%';
      };

    console.log('width', width)

    var styling;
    if(this.props.wordCount<6) {styling = 'progress-bar progress-bar-warning'}
      else if(this.props.wordCount===6) {styling = 'progress-bar progress-bar-success'}
        else {styling = 'progress-bar progress-bar-danger'};

    return(
      <div className="progress">
        <div className={styling} style={{width}}></div>
      </div>
    );
  }
});