var React = require('react');
var Auth = require('../../../server/auth');

var logo = require('./../../images/Fwibble-logo-cropped.png')

module.exports = React.createClass({
  componentDidMount: function(){
    this.props.logoutUser();
  },

  render: function(){
    
    return (
      <div className="container">
        <div className="text-center">
          <div className="row">
            <div className="signoutBox">
              <div className="col-md-6 col-md-offset-3">
                <div className="jumbotron">
                  <div><img src={logo} width='200px' alt="Fwibble" className="center-block"/></div>
                  <p>You have successfully logged out.</p>
                  <a href="/signin">Need more Fwibbles in your life? Sign back in!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});