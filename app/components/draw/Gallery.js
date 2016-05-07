var React = require('react');
var Canvas = require('./canvas');

module.exports = React.createClass({
  render: function(){
    return (
      <div>
        {
          this.props.drawings.map((d, i) => (
            <Canvas 
              key={i}
              index={i}
              redraw={this.props.redraw}
              clickX={d.clickX} 
              clickY={d.clickY} 
              clickDrag={d.clickDrag} 
              clickColor={d.clickColor}
            />
          ))
        }
      </div>
    )
  }
})