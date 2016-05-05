var React = require('react');
var Canvas = require('./canvas');
var Gallery = require('./gallery');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      drawings: []
    }
  },
  saveDrawing: function(data){
    var { drawings } = this.state;
    drawings.push(data);
    this.setState({drawings: drawings});
  },
  render: function(){

    var buttonColors = ['red', 'blue', 'yellow', 'black'];
    return (
      <div className="canvas-container">
        <Canvas saveDrawing={this.saveDrawing} />
        <div className="button-container">
          { buttonColors.map((color, i) => ( <button key={i} id={color} className="color-button"/> )) }
        </div>
        <Gallery drawings={this.state.drawings} />
      </div>
    )
  }
})