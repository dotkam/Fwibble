var React = require('react');
var ReactRouter = require('react-router');

var io = require('socket.io-client');
var socket = io.connect();

// TODO Add Facebook/Twitter sharing

module.exports = React.createClass({
  getInitialState: function(){
    return { fwibs: [] }
  },
  componentDidMount: function(){
    socket.on('archive:response', this.setFwibs);
    socket.emit('fetch:archivedFwibs', {gamehash: this.props.params.game_hash});
  },
  setFwibs: function(data){
    this.setState({fwibs: data.fwibs});
  },
  render: function(){
    return (
      <div>
        {this.state.fwibs.map((fwib, i) => (<div>{fwib.fwib_content}</div>))}
      </div>
    )
  } 
})