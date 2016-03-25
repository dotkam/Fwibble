var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  
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