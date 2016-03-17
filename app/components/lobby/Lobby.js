var React = require('react');
var ReactDOM = require('react-dom');

var io = require('socket.io-client');
var socket = io.connect();


module.exports = React.createClass({

  getInitialState: function() {
    
  },

	render: function() {
		return (
			<div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
      				<p>Greetings, Fwibbler! You can create your own new Fwibble now or join an existing Fwibble below.</p>
            </div>
          </div>
          <h3>Existing Fwibbles</h3>
          <div>
            <div className="row">
              <div className="col-md-8 col-offset-2">
                <button type="button" class="btn btn-primary btn-lg btn-block">New Fwibble</button>
              </div>
            </div>
            <div className="row">
              <ul
              //existing fwibbles...new game api call???
              >
                <li><button type="button" class="btn btn-primary btn-lg btn-block">The Pumpkin that Ate the World and Then Was Very Lonely</button></li>
                <li><button type="button" class="btn btn-primary btn-lg btn-block">The Day Batman Finally Just Had a Nice, Long Cry</button></li>
                <li><button type="button" class="btn btn-primary btn-lg btn-block">Giggles the Clown Goes to Paris</button></li>
              </ul>
            </div>
          </div>
        </div>
		  </div>
		);
	}
});