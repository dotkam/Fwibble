var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  render: function () {
    var Title = (<div>{this.props.title}</div>);

    return (
      <div className="titleBackground">
        <h3 className="StoryTitle">
          {Title}
        </h3>
      </div>
    );
  }
});