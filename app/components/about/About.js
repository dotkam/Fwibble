var React = require('react');
var Logo = require('./../../images/Fwibble-logo-cropped.png')

module.exports = React.createClass({
  render: function(){
    return (
      <div className="about-content">
        <h2>What is a Fwibble, you may ask?</h2>
        <p>
          Fwibble was born out of the love of playground telephone games, silly stories with the family on road trips, and real-time, interactive social media experiences.
        </p>
        <p>
          A Fwibble combines collaboration, spontaneity, and a knack for the absurd.
        </p>
        <p>
          The result can be a scribble or a fractured fable. Hence: Fwibble!
        </p>
        <h2>How to Play</h2>
        <p>
        Participants take turns typing 6-word additions to the Fwibble; these individual snippets are called Fwibs.
        </p>
        <p>
        Sometimes a sentence will be left incomplete, so it’s up to the next player to finish that thought. This strategy leads to the zany Fwibble fun we’re all so fond of.
        </p>
        <p>
         The overall game is timed, and when the time expires the Fwibble is finished: so make those Fwibs fly off your fingers, players!
        </p>
      </div>
    )
  }
})
