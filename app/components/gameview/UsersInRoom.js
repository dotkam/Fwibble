var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {userColors: {}};
  },

  componentWillReceiveProps: function(newProps) {
    var options = ['#F9096E','#24C9C9','#9ACC00'], curr=0;

    for (var i=0; i<this.props.users.length; i++) {
      this.state.userColors[this.props.users[i]] = options[curr]
      if (curr<options.length-1) {curr++} else {curr=0}
    }
  },
  
  render: function (){
    return (
      <div className="panel panel-info">
        <h4 className="panel-heading"> Users in Room </h4>
        <ul className="panel-body">
          {
            this.props.users.map((user, i) => {
              var color = this.state.userColors[user];
              var style = {color: color};
              var spacer = this.props.users[this.props.turn]===user ? '* ' : "\u00a0\u00a0";

              return (
                <li className="list-unstyled" key={i} style={style}>
                  {spacer}{user}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});