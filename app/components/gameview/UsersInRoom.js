var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  getInitialState: function() {
    return {userColors: {}};
  },
  
  render: function (){
    return (
      <div className="panel panel-info">
        <h4 className="panel-heading"> Users in Room </h4>
        <ul className="panel-body">
          {
            this.props.users.map((user, i) => {
              var options = ['#F9096E','#24C9C9','#9ACC00'];
              var color = options[i % 3];
              var style = {color: color};
              var spacer = this.props.users[this.props.turn]===user ? <div className="glyphicon glyphicon-star"></div> : "\u00a0\u00a0\u00a0";

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