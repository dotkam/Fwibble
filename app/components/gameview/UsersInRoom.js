var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {userColors: {}};
  },

  componentWillReceiveProps: function(newProps) {
    var options = ['DeepPink','DarkSlateBlue','Orange', 'Green','RedWine'], curr=0;

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
              return (
                <li className="list-unstyled" key={i}>
                  {user}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});