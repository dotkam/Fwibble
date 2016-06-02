var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  render: function(){
    return (
      <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <br/>
        <div className="text-center">
          <button type="button" className="btn btn-primary btn-lg btn-success btn-block" onClick={this.props.startGame}>Go</button>
        </div>
        <br/>
        <div className="text-center">
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.leaveGame}>Leave Game</button>
        </div>
      </div>
    )
  }
})
