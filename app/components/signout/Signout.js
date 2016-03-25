var React = require('react');
var Auth = require('../../../server/auth');

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
                  <div><img src={'./images/Fwibble-logo-cropped.png'} width='400px' height='200px' alt="Fwibble" className="img-responsive"/></div>
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