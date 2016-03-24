var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  
  render: function (){
    return (
      <div className='users panel panel-info'>
        <h3 className='usersTitle panel-heading'> Users in Room </h3>
        <ul className='usersList panel-body'>
          {
            this.props.users.map((user, i) => {
              return (
                <li className='list-unstyled' key={i}>
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