var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  
  render: function (){
    return (
      <div className='users'>
        <h3> Users in Room: </h3>
        <ul>
          {
            this.props.users.map((user, i) => {
              return (
                <li key={i}>
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