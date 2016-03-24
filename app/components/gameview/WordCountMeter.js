var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  render: function() {
    var width;
    if(this.props.wordCount>5) {width = '100%'}
      else {
        var value = "" + (100 * this.props.wordCount / 6);
        width = value.slice(0,2) + '%';
      };

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