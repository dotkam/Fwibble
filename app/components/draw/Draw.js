var React = require('react');
var Canvas = require('./canvas');

module.exports = React.createClass({
  
  render: function(){

    var buttonColors = ['red', 'blue', 'yellow', 'black'];
    return (
      <div>
        <Canvas/>
        <div className="button-container">
          { buttonColors.map((color, i) => ( <button key={i} id={color} className="color-button"/> )) }
        </div>
      </div>
    )
  }
})